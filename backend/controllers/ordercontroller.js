
// import orderModel from "../models/orderModel.js";
// import userModel from'../models/UserModel.js'
// import Stripe from 'stripe'


// const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)

// // placing user order for frontend
// const placeOrder = async (req, res) => {
//   try {
//     const frontend_url = "http://localhost:5173";

//     const line_items = req.body.items.map((item) => ({
//       price_data: {
//         currency: "inr",
//         product_data: { name: item.name },
//         unit_amount: item.price * 100
//       },
//       quantity: item.quantity
//     }));

//     line_items.push({
//       price_data: {
//         currency: "inr",
//         product_data: { name: "Delivery Charges" },
//         unit_amount: 2000
//       },
//       quantity: 1
//     });

//     // 🔴 Create a Stripe Checkout Session
//     const session = await stripe.checkout.sessions.create({
//       line_items: line_items,
//       mode: "payment",
//       success_url: `${frontend_url}/verify?success=true&userId=${req.body.userId}`,
//       cancel_url: `${frontend_url}/verify?success=false&userId=${req.body.userId}`
//     });

//     res.json({ success: true, session_url: session.url });

//   } catch (error) {
//     console.error("Stripe Error:", error);
//     res.status(500).json({ success: false, message: "Error processing payment" });
//   }
// };




// const verifyOrder = async (req, res) => {
//   const { userId, success } = req.query;

//   try {
//     if (success === "true") {
//       // 🔴 Create the order only if payment was successful
//       const newOrder = new orderModel({
//         userId: userId,
//         items: req.body.items,
//         amount: req.body.amount,
//         address: req.body.address,
//         payment: true
//       });

//       await newOrder.save();
//       await userModel.findByIdAndUpdate(userId, { cartData: {} });

//       res.json({ success: true, message: "Order Placed" });

//     } else {
//       res.json({ success: false, message: "Payment Failed" });
//     }
//   } catch (error) {
//     console.error("Verify Order Error:", error);
//     res.status(500).json({ success: false, message: "Error verifying order" });
//   }
// };



// //user orders for frontend

// const userOrders=async(req,res)=>{

//   try{
//     const orders=await orderModel.find({userId:req.body.userId});
//     res.json({success:true,data:orders})


//   }catch(error){

//     console.log(error);
//     res.json({success:false,message:"Error"})

//   }

// }

// // listing orders for admin panel

// const listOrders=async(req,res)=>{
//   try{
//     const orders=await orderModel.find({});
//     res.json({success:true,data:orders})

//   }catch(error){
//     console.log(error);
//     res.json({success:false,message:"Error"})

//   }

// }
// // api for updating order status
// const updateStatus=async(req,res)=>{
//   try{

//     await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
//     res.json({success:true,messsage:"Status Updated"})
//   }catch(error){
//     console.log(error);
//     res.json({success:false,message:"Error"})

//   }

// }

// export{placeOrder,verifyOrder,userOrders,listOrders,updateStatus}








import orderModel from "../models/orderModel.js";
import userModel from "../models/UserModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// 🔹 Placing an order & redirecting to Stripe for payment
const placeOrder = async (req, res) => {
  try {
    const frontend_url = "http://localhost:5173";

    if (!req.body.items || req.body.items.length === 0) {
      return res.status(400).json({ success: false, message: "No items in order" });
    }

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: { name: item.name },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: { name: "Delivery Charges" },
        unit_amount: 2000,
      },
      quantity: 1,
    });

    // ✅ Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      // success_url: `${frontend_url}/verify?success=true&userId=${req.body.userId}&session_id={CHECKOUT_SESSION_ID}`,
      success_url: `http://localhost:5174/myorders`,

      cancel_url: `${frontend_url}/verify?success=false&userId=${req.body.userId}`,

      
    });

    console.log("payment done....123");
    const id = req.body.userId;
    const address = req.body.address; 
    const items = req.body.items;
    const amount = req.body.amount; 

    // const user = new userModel.findOne({id});
    const order = new orderModel({
      userId:id,
      address:address,
      items:items,
      amount:amount
    })


    await order.save();
    

    res.json({ success: true, session_url: session.url });

  } catch (error) {
    console.error("❌ Stripe Payment Error:", error);
    res.status(500).json({ success: false, message: "Error processing payment" });
  }
};

// 🔹 Verifying payment & storing order
const verifyOrder = async (req, res) => {
  try {
    const { userId, success, session_id } = req.query;

    if (success !== "true") {
      return res.status(400).json({ success: false, message: "Payment failed" });
    }

    // ✅ Retrieve Stripe session to verify payment status
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== "paid") {
      return res.status(400).json({ success: false, message: "Payment not completed" });
    }

    // ✅ Save order in DB
    const newOrder = new orderModel({
      userId: userId,
      items: session.metadata.items ? JSON.parse(session.metadata.items) : [],
      amount: session.amount_total / 100,
      address: session.metadata.address || "No Address Provided",
      payment: true,
      status: "Processing",
      
    });

    await newOrder.save();

    // ✅ Clear user cart after successful order
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed Successfully" });

  } catch (error) {
    console.error("❌ Order Verification Error:", error);
    res.status(500).json({ success: false, message: "Error verifying order" });
  }
};

// 🔹 Fetch user orders
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId }).sort({ createdAt: -1 });

    res.json({ success: true, data: orders });

  } catch (error) {
    console.error("❌ Fetching Orders Error:", error);
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
};

// 🔹 Admin: Fetch all orders
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({}).sort({ createdAt: -1 });

    res.json({ success: true, data: orders });

  } catch (error) {
    console.error("❌ Fetching All Orders Error:", error);
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
};

// 🔹 Admin: Update order status
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });

    res.json({ success: true, message: "Status Updated" });

  } catch (error) {
    console.error("❌ Updating Order Status Error:", error);
    res.status(500).json({ success: false, message: "Error updating order status" });
  }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };




