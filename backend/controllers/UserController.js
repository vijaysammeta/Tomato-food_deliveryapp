import UserModel from "../models/UserModel.js";
import jwt from "jsonwebtoken"
import bcrypt from"bcrypt"
import validator from "validator"


// Login user
const loginUser = async (req, res) => {
  try {
    // Extracting email and password from request body
    const { email, password } = req.body;

    // Check if the user exists
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    // Create a token for the user
    const token = createToken(user._id);

    // Respond with success and token
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error logging in" });
  }
};




const createToken=(id)=>{
  return jwt.sign({id},process.env.JWT_SECRET)
}


//  register user
const registerUser=async(req,res)=>{
try{
    
    // Extracting data from request body
    const { name, email, password } = req.body;
    console.log("Received Request Body:", req.body); 
    
  //checking is user already exists 
  const exists=await UserModel.findOne({email});
  if(exists){
    return res.json({success:false,message:"user already exists"})
    console.log("im hereee");
  }
  //validating email format & strong password
  if(!validator.isEmail(email)){
    return res.json({success:false,message:"please enter a valid email"})
  }
  if(password.length<8){
    return res.json({success:false,message:"please enter strong password"})
  }

  //hashing user password
  const salt=await bcrypt.genSalt(10);
  const hashedpassword=await bcrypt.hash(password,salt);

  const newUser=new UserModel({
    name:name,
    email:email,
    password:hashedpassword
  })
   
const user=await newUser.save()
const token=createToken(user._id)
res.json({success:true,token});


}catch(error){

  console.log(error);
  res.json({success:false,message:"Error from register"})
}


}
export {loginUser,registerUser}