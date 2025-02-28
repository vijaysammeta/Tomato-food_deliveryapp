// import React, { useState } from 'react';

// import Navbar from './components/navbar/Navbar';
// import { Route, Routes } from 'react-router-dom';
// import Home from './pages/Home/Home';
// import Cart from './pages/Cart/Cart';
// import Placeorder from './pages/Placeorder/Placeorder';
// import Footer from './components/Footer/Footer';
// import LoginPopup from './components/LoginPopup/LoginPopup';
// import Verify from './pages/Verify/Verify';
// import MyOrders from './pages/MyOrders/MyOrders';

// import About from './pages/About';
// import Delivery from './pages/Delivery';
// import PrivacyPolicy from './pages/PrivacyPolicy';

// const App=()=> {

//   const[showLogin,setShowLogin]=useState(false)
//   return (
//     <>
//     {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}


//     <div className='app'>
//       <Navbar setShowLogin={setShowLogin}/>
//       <Routes>
//         <Route path='/'element={<Home/>}/>
//         <Route path='/cart'element={<Cart/>}/>
//         <Route path='/order'element={<Placeorder/>}/>
//         <Route path='/verify' element={<Verify/>}/>
//         <Route path='/myorders'element={<MyOrders/>}/>

//         <Route path="/about" element={<About />} />
//           <Route path="/delivery" element={<Delivery />} />
//           <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//       </Routes>
      
//     </div>
//     <Footer/>
//     </>
//   );
// }

// export default App;

import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import Placeorder from './pages/Placeorder/Placeorder';
import Verify from './pages/Verify/Verify';
import MyOrders from './pages/MyOrders/MyOrders';
import About from './pages/About';
import Delivery from './pages/Delivery';
import PrivacyPolicy from './pages/PrivacyPolicy';
import LoginPopup from './components/LoginPopup/LoginPopup';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}

      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />

        <Routes>
          {/* Main Pages */}
          <Route path='/' element={<><Home /><Footer /></>} />
          <Route path='/cart' element={<><Cart /><Footer /></>} />
          <Route path='/order' element={<><Placeorder /><Footer /></>} />
          <Route path='/verify' element={<><Verify /><Footer /></>} />
          <Route path='/myorders' element={<><MyOrders /><Footer /></>} />

          {/* Separate Pages (No Footer) */}
          <Route path="/about" element={<About />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
