import React, { useContext, useEffect, useState } from "react";
import './Navbar.css';
import { assets } from '../../assets/frontend-assets/assets';
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";


const Navbar = ({setShowLogin}) => {
  const [menubar, setMenu] = useState("menubar");
  const{getTotalCartAmount,token,setToken,setSearchQueryf}=useContext(StoreContext)
  const navigate=useNavigate();

 
 
  const Logout=()=>{
     localStorage.removeItem("token");
     setToken("");
     navigate("/")  
     
  

  }

  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} 
      alt='' className='logo' /></Link>
      <ul className='navbar-menu'>
        <Link 
          to='/' 
          onClick={() => setMenu("Home")} 
          className={menubar === "Home" ? "active" : ""} 
        >Home</Link>

        <a 
          href="#explore-menu" 
          onClick={() => setMenu("Menu")} 
          className={menubar === "Menu" ? "active" : ""}
        >Menu</a>

        <a 
          href="#app-download" 
          onClick={() => setMenu("Mobile-app")} 
          className={menubar === "Mobile-app" ? "active" : ""}
        >Mobile-app</a>

        <a 
          href="#footer" 
          onClick={() => setMenu("Contact us")} 
          className={menubar === "Contact us" ? "active" : ""}
        >Contact us</a>
      </ul>

      <div className='navbar-right'>
        
        <img src={assets.search_icon} alt="Search" />
        
        <div className="navbar-search-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt="Basket" /></Link>
          <div className={getTotalCartAmount()===0 ?"":"dot"}></div>
        </div>
        {!token?<button onClick={()=>setShowLogin(true)} >Sign in</button>
        :<div className="navbar-profile">
          <img src={assets.profile_icon}alt=""/>
          <ul className="nav-profile-dropdown">
            <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="Orders"/><p>Orders</p></li>
            <hr/>
            <li onClick={Logout}><img src={assets.logout_icon}alt="Logout"/><p>Logout</p></li>


          </ul>
          </div>}
        
      </div>
    </div>
  );
};

export default Navbar;


