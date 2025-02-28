// import React, { useContext } from 'react'
// import './Verify.css'
// import {useNavigate, useSearchParams} from 'react-router-dom'
// import { StoreContext } from '../../Context/StoreContext';
// import axios from 'axios';

// const Verify= () => {

//   const [searchParams,setSearchParams]=useSearchparams();
//   const success=searchParams.get("success");
//   const orderId=searchParams.get("orderId");

//   //console.log(success,orderId); printing true console
//   const {url}=useContext(StoreContext);
//   const navigate =useNavigate();

//   const verifyPayment=async()=>{
//     const response=await axios.post(url+"/api/order/verify",{success,orderId})
//     if(response.data.success){
//       navigate("myorders");
//     }
//     else{
//       navigate("/");
//     }
//   }

//   return (
//     <div className='verify'>
//       <div className="spinnr">

//       </div>

//     </div>
//   )
// }

// export default Verify;

import React, { useContext } from "react";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom"; // ✅ Correct import
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      const response = await axios.post(url + "/api/order/verify", { success, orderId });
      if (response.data.success) {
        navigate("/myorders"); // ✅ Correct route
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Payment verification failed:", error);
      navigate("/");
    }
  };

  // ✅ Trigger payment verification on load
  React.useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
