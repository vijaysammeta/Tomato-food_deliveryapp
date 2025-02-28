// import React from 'react'
// import "./Footer.css"
// import { assets } from '../../assets/frontend-assets/assets'

// const Footer = () => {
//   return (
//     <div className='footer'id='footer'>
//       <div className="footer-content">
//         <div className="footer-content-left">
//           <img src={assets.foodie} alt=""/>
//           <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore temporibus sunt esse, laborum vero accusamus perferendis voluptatum omnis quasi earum itaque beatae, porro voluptatem? Blanditiis exercitationem quas dignissimos accusamus libero?</p>
//           <div className='footer-social-icons'>
//             <img src={assets.facebook_icon} alt="" />
//             <img src={assets.twitter_icon} alt="" />
//             <img src={assets.linkedin_icon} alt="" />

//           </div>
//         </div>

//         <div className="footer-content-center">
//           <h2>COMPANY</h2>
//           <ul>
//             <li>Home</li>
//             <li>About us</li>
//             <li>Delivery</li>
//             <li>Privacy policy</li>
//           </ul>
//         </div>
//         <div className="footer-content-right">
//           <h2>Get in Touch</h2>
//           <ul>
//             <li>+1-212-456-7890</li>
//             <li>contact@tomato.com</li>
//           </ul>
//         </div>
//       </div>
//       <hr/>
//       <p className='footer-copyright'>Copyright 2025 @ Tomato.com -All Right Reserved</p>

//     </div>
//   )
// }

// export default Footer





import React from 'react';
import "./Footer.css";
import { assets } from '../../assets/frontend-assets/assets';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="Logo" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore temporibus sunt esse, laborum vero accusamus perferendis voluptatum omnis quasi earum itaque beatae, porro voluptatem? Blanditiis exercitationem quas dignissimos accusamus libero?
          </p>
          <div className='footer-social-icons'>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <img src={assets.facebook_icon} alt="Facebook" />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <img src={assets.twitter_icon} alt="Twitter" />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <img src={assets.linkedin_icon} alt="LinkedIn" />
            </a>
          </div>
        </div>

        <div className="footer-content-center">
  <h2>COMPANY</h2>
  <ul>
          <li><Link to="/">Home</Link></li>  {/* ✅ Redirects to Home */}
          <li><Link to="/about">About Us</Link></li>  {/* ✅ Opens About Page */}
          <li><Link to="/delivery">Delivery</Link></li>  {/* ✅ Opens Delivery Page */}
          <li><Link to="/privacy-policy">Privacy Policy</Link></li>  {/* ✅ Opens Privacy Policy */}
        </ul>
</div>

        <div className="footer-content-right">
          <h2>Get in Touch</h2>
          <ul>
            <li>+1-212-456-7890</li>
            <li>contact@tomato.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className='footer-copyright'>Copyright 2025 @ Tomato.com - All Rights Reserved</p>
    </div>
  );
};

export default Footer;
