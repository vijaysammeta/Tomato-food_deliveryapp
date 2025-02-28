import UserModel from "../models/UserModel.js";

// Add items to user cart
const addToCart = async (req, res) => {
  try {
    let userData = await UserModel.findById(req.body.userId );

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {}; // Ensure cartData is an object

    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    await UserModel.findByIdAndUpdate(
      req.body.userId,
      { $set: { cartData } },
      { new: true }
    );

    res.json({ success: true, message: "Added To Cart" });

  } catch (error) {

    console.error(error);
    res.json({ success: false, message: "Error" });
  }
};


//remove items from user cart
const removeFromCart=async(req,res)=>{

try{
  let userData=await UserModel.findById(req.body.userId)
  let cartData=await userData.cartData;
  if(cartData[req.body.itemId]>0){
    cartData[req.body.itemId]-=1;
  }
  await UserModel.findByIdAndUpdate(req.body.userId,{cartData});
  res.json({success:true,message:"Removed From Cart"})

}catch(error){
  console.log(error);
  res.json({success:false,message:"Error"})

}


}

//fetch user cart data
const getCart=async(req,res)=>{

try{
  let userData=await UserModel.findById(req.body.userId);
  let cartData=await userData.cartData;
  res.json({success:true,cartData})

}catch(error){
  console.log(error);
  res.json({success:false,message:"Error"})

}

}

export{addToCart,removeFromCart,getCart}