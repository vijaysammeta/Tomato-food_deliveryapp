import React, { useContext, useEffect, useState } from 'react'
import "./Placeorder.css"
import { StoreContext } from '../../Context/StoreContext'
//import { placeOrder } from "../../../backend/controllers/ordercontroller.js";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Placeorder = () => {

  const { getTotalCartAmount,token,food_list,cartItems,url } = useContext(StoreContext);


  const [data,setData]=useState({
    firstName:"vijay",
    lastName:"kumar",
    email:"vijay@gmail.com",
    street:"xxx",
    city:"xyz",
    state:"tel",
    zipcode:"1234",
    country:"india",
    phone:"987657890987"

  })

  const onChangeHandler=(event)=>{
    const name=event.target.name;
    const value=event.target.value;
    setData(data=>({...data,[name]:value}))

  }



  const checkoutHandler = async () => {
    try {
      const response = await axios.post("http://localhost:4000/api/order/place", data);
  
      if (response.data.success) {
        console.log("Redirecting to Stripe...");
        console.log("my data :",response.data);
        
        window.location.href = response.data.session_url; // ✅ Redirect to Stripe Payment Page
      } else {
        alert("Order placement failed. Try again!");
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      alert("Error processing payment.");
    }
  };

  const placeOrder = async (event) => {
    // navigate = useNavigate();
    event.preventDefault();
  
    let orderItems = food_list.filter((item) => cartItems[item._id] > 0)
      .map((item) => ({
        ...item,
        quantity: cartItems[item._id],
      }));
  
    let orderData = {
      userId: localStorage.getItem("userId"),
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    console.log("Order Data:", orderData);  // ✅ Log data before sending
    console.log("API URL:", url + "/api/order/place");  // ✅ Check API URL

    try {
        let res = await axios.post(url + "/api/order/place", orderData, {
            headers: { token },
            body: JSON.stringify({userId:orderData.userId,address:orderData.address,items:orderData.items,amount:orderData.amount})
        });

        console.log("API Response:", res.data);  // ✅ Log API response

        if (res.data.success) {
            const { session_url } = res.data;
            console.log("Redirecting to:", session_url);  // ✅ Log the redirection URL
            window.location.replace(session_url);
            // navigate('/')
        } else {
            console.error("Order processing failed:", res.data);
            alert("Error processing order. Please try again.");
        }
    } catch (error) {
        console.error("Order placement error:", error.response ? error.response.data : error.message);
        alert("Failed to place order.");
    }
};


  const navigate=useNavigate();

  useEffect(()=>{
    if(!token){
      navigate('/cart')

    }
    else if(getTotalCartAmount()===0)
      {
        navigate('/cart')
      }
  },[token])

  


  return (
    <form  onSubmit={placeOrder}className='place-order'>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>

      <div className="multi-fields">
        <input required name='firstName'onChange={onChangeHandler}value={data.firstName}type='text'placeholder='First Name'/>
        <input required name='lastName'onChange={onChangeHandler}value={data.lastName}type='text'placeholder='Last Name'/>

      </div>
          <input required name='email'onChange={onChangeHandler}value={data.email} type='email'placeholder='Email adress'/>
          <input required name='street'onChange={onChangeHandler}value={data.street}type='text'placeholder='Street'/>

          <div className="multi-fields">
        <input required name='city'onChange={onChangeHandler}value={data.city} type='text'placeholder='City'/>
        <input required name='state'onChange={onChangeHandler}value={data.state} type='text'placeholder='State'/>
      </div>

      <div className="multi-fields">
        <input required name='zipcode'onChange={onChangeHandler}value={data.zipcode}type='text'placeholder='Zip code'/>
        <input required name='country'onChange={onChangeHandler}value={data.country} type='text'placeholder='Country'/>

      </div>
          <input required name='phone'onChange={onChangeHandler}value={data.phone} type='text'placeholder='Phone'/>
      </div>
      <div className="place-order-right">

      <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
          <div className='cart-total-details'>
            <p>Subtotal</p>
            <p>${getTotalCartAmount()}</p>

          </div>
          <hr/>
          <div className='cart-total-details'>
            <p>Delivery Fee</p>
            <p>${getTotalCartAmount()===0?0:2}</p>

          </div>
          <hr/>
          <div className='cart-total-details'>
            <b>Total</b>
            <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>

          </div>
          
          </div>
          {/* <button type='submit'>PROCEED TO PAYMENT</button> */}
          <button onClick={checkoutHandler}>Proceed to Payment</button>

        </div>

      </div>
    </form>
  )
}

export default Placeorder