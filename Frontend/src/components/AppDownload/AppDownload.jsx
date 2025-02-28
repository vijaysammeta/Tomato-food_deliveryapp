// import React from 'react'
// import "./AppDownload.css"
// import { assets } from '../../assets/frontend-assets/assets'

// const AppDownload = () => {
//   return (
//     <div className='app-download'id="app-download">
//       <p>For Better Experience Download<b/>Tomato App</p>
//       <div className='app-download-platforms'>
//       <img src={assets.play_store} alt="" />
//       <img src={assets.app_store} alt="" />
//     </div>
//     </div>
//   )
// }

// export default AppDownload




import React from 'react';
import "./AppDownload.css";
import { assets } from '../../assets/frontend-assets/assets';

const AppDownload = () => {
  return (
    <div className='app-download' id="app-download">
      <p>For Better Experience Download <b>Tomato App</b></p>
      <div className='app-download-platforms'>
        <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
          <img src={assets.play_store} alt="Download on Play Store" />
        </a>
        <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
          <img src={assets.app_store} alt="Download on App Store" />
        </a>
      </div>
    </div>
  );
}

export default AppDownload;
