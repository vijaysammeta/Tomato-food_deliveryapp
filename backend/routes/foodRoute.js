// import express from "express"
// import { addFood } from "../controllers/foodcontroller.js"
// import multer from "multer"

// const foodRouter=express.Router();

// //image storage engine
// const storage=multer.diskStorage({
//   destination:"uploads",
//   filename:(req,file,cb)=>{
//     return cb(null,`${Date.now()}${file.originalname}`);
//   },
// });

// const upload=multer({storage:storage})
// foodRouter.post("/add",upload.single("image"),addFood)







// export default foodRouter;



import express from "express";
import multer from "multer";
import { addFood, listFood,removeFood} from "../controllers/foodcontroller.js";

// Create storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");  // Ensure the file is saved in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);  // Generating a unique filename
  }
});

// Initialize multer with the storage engine
const upload = multer({ storage: storage });

// Define routes
const foodRouter = express.Router();

// Handle POST request to add food item, with single file upload
foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list",listFood)
foodRouter.post("/remove",removeFood)
export default foodRouter;
