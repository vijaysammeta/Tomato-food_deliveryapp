import mongoose from "mongoose";

export const connectDB=async()=>{
  await mongoose.connect('mongodb+srv://vijay:vijay2003@cluster0.eumzn.mongodb.net/FOOD-DELEVERY').then(()=>console.log("DB connected"));
}