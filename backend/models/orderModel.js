import mongoose from 'mongoose'


//console.log("Mongoose Models:", mongoose.models);


const orderSchema =new mongoose.Schema({
  userId:{type:String,required:true},
  items:{type:Array,required:true},
  amount:{type:Number,required:true},
  address:{type:Object,required:true},
  status:{type:String,default:"Food Processing"},
  date:{type:Date,default:Date.now},
  payment:{type:Boolean,default:false}

})

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);


console.log("Mongoose Models After Order Registration:", mongoose.models);


export default orderModel;