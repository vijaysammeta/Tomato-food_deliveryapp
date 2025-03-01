import foodModel from "../models/foodmodel.js";
import fs from 'fs'


// add food item

const addFood = async (req, res) => {
  // Log the body and file for debugging
  console.log("Received request body:", req.body);
  console.log("Received file:", req.file);
  

  // Check if the file is not uploaded (i.e., req.file is undefined)
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No image uploaded" });
  }

  let image_filename = req.file.filename;

  // Create a new food document
  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
//remove food item
const removeFood=async(req,res)=>{
  
  try{
    const food=await foodModel.findById(req.body.id)
    fs.unlink(`uploads/${food.image}`,()=>{})

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({success:true,message:"Food Removed"})
  }
  catch(error)
  {
      console.log(error);
      res.json({success:false,message:"error"})
  }

}

// all food list

const listFood=async(req,res)=>{
  try{
    const foods=await foodModel.find({});
    res.json({success:true,data:foods})
  }catch(error){
    console.log(error);
    res.json({success:false,message:"Error"})
  }

}
export { addFood,listFood,removeFood };





















