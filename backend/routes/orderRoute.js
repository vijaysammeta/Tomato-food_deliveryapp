import express from 'express'
import orderModel from "../models/orderModel.js";
import authMiddleware from '../middleware/auth.js'
import { placeOrder, userOrders, verifyOrder,listOrders ,updateStatus} from '../controllers/ordercontroller.js'


const orderRouter=express.Router();

orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/verify",verifyOrder);
orderRouter.post("/userOrders",authMiddleware,userOrders)
orderRouter.get('/list',listOrders)
orderRouter.post("/status",updateStatus)


export default orderRouter;


// import express from "express";
// import orderModel from "../models/orderModel.js";  // ✅ Ensure correct import

// const router = express.Router();

// // Example API route to test if orders can be created
// router.post("/create", async (req, res) => {
//   try {
//     const newOrder = new orderModel(req.body);
//     await newOrder.save();
//     res.status(201).json({ message: "Order Created", order: newOrder });
//   } catch (error) {
//     console.error("Order Creation Error:", error);
//     res.status(500).json({ message: "Order creation failed", error });
//   }
// });

// export default router;
