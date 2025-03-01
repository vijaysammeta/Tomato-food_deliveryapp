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


