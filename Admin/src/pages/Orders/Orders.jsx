// import React, { useState, useEffect } from "react";
// import "./Orders.css";
// import { toast } from "react-toastify";
// import axios from "axios";
// import{assets} from"../../assets/assets"

// const Orders = ({ url }) => {  // ✅ Pass url as a prop

//   const [orders, setOrders] = useState([]);

//   const fetchAllOrders = async () => {
//     try {
//       const response = await axios.get(url + "/api/order/list");
//       if (response.data.success) {
//         setOrders(response.data.data);
//         console.log("Orders:", response.data.data);
//       } else {
//         toast.error("Error fetching orders");
//       }
//     } catch (error) {
//       console.error("Fetch Orders Error:", error);
//       toast.error("Failed to fetch orders");
//     }
//   };

//   useEffect(() => {
//     fetchAllOrders();
//   }, [url]);  // ✅ Added url as a dependency

//   return (
//     <div className="order add">
//       <h3> Order page</h3>
//       <div className="order-list">
//         <div key={index} className="order-item">
//           <img src={assets.parcel_icon}alt=""/>
//           <div>
//             <p className="order-item-food">
//               {orders.items.map((item,index)=>{
//                 if(index===orders.items.length-1){
//                   return item.name + " x "+ item.quantity
//                 }
//                 else{
//                   return item.name +" x "+ item.quantity+", "
//                 }
//               })}
//             </p>
//           </div>
//         </div>
//       </div>
      
//     </div>
//   );
// };

// export default Orders;



import React, { useState, useEffect } from "react";
import "./Orders.css";
import { toast } from "react-toastify";
import axios from "axios";
import{assets} from"../../assets/assets"

const Orders = ({ url }) => {
  const [orders, setOrders] = useState(null); // ✅ Initialize orders as null

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      console.log("API Response:", response.data); // ✅ Debugging line
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders");
    }
  };
  const statusHandler=async(event,orderId)=>{
   const response=await axios.post(url+"/api/order/status",{
    orderId,
    status:event.target.value
   })
   if(response.data.success){
    await fetchAllOrders();
   }
  }

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders && orders.length > 0 ? ( // ✅ Ensure orders exists before mapping
          orders.map((order, orderIndex) => (
            <div key={order._id || orderIndex} className="order-item">
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p className="order-item-food">
                  {order.items.map((item, index) => (
                    <span key={item._id || index}>
                      {item.name} x {item.quantity}
                      {index !== order.items.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
                <p className="order-item-name">{order.address.firstName+" "+order.address.lastName}</p>
                <div className="order-item-address">
                  <p>{order.address.street+","}</p>
                  <p>{order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.zipcode}</p>
                </div>
                <p className="order-item-phone">{order.address.phone}</p>
              </div>
              <p>items:{order.items.length}</p>
              <p>${order.amount}</p>
              <select onChange={(event)=>statusHandler(event,order._id)}value={order.status}>
                <option value="Food Processing">Food Processing</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
              
            </div>
          ))
        ) : (
          <p>Loading or No orders available</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
