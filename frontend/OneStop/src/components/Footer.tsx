import React from "react";
import './Footer.css';

/*
  Footer component with standard links and SVG icons for social media
  applications
*/

const Footer: React.FC = () => {
  return (
    <footer className="footerMainContainer">
      <div className="footerSection left">
        <h2 className="footerLogo">OneStop</h2>
        <p className="footerDescription">
          Your all-in-one destination for quality products and smart shopping.
        </p>
      </div>

      <div className="footerSection center">
        <a href="#" className="footerLink">About Us</a>
        <a href="#" className="footerLink">Contact</a>
        <a href="#" className="footerLink">Privacy Policy</a>
        <a href="#" className="footerLink">Terms of Service</a>
      </div>

      <div className="footerSection right">
        <a href="#" className="socialIcon" aria-label="Facebook">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-2.9h2v-2.2c0-2 1.2-3.1 3-3.1.9 0 1.8.1 2 .1v2.2h-1.1c-1 0-1.3.6-1.3 1.2v1.8h2.5l-.4 2.9h-2.1v7A10 10 0 0 0 22 12"/>
          </svg>
        </a>
        <a href="#" className="socialIcon" aria-label="Twitter">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.46 6c-.77.35-1.6.58-2.46.69a4.28 4.28 0 0 0 1.88-2.37 8.55 8.55 0 0 1-2.72 1.04A4.26 4.26 0 0 0 16.11 4c-2.38 0-4.3 1.93-4.3 4.3 0 .34.04.67.1.99a12.09 12.09 0 0 1-8.78-4.46 4.29 4.29 0 0 0 1.33 5.73 4.18 4.18 0 0 1-1.95-.54v.06a4.3 4.3 0 0 0 3.44 4.21 4.24 4.24 0 0 1-1.94.07 4.31 4.31 0 0 0 4.02 2.99A8.56 8.56 0 0 1 2 19.54a12.07 12.07 0 0 0 6.56 1.92c7.87 0 12.18-6.52 12.18-12.18v-.56A8.64 8.64 0 0 0 22.46 6z"/>
          </svg>
        </a>
        <a href="#" className="socialIcon" aria-label="Instagram">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="currentColor" d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm0 2h10c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3zm5 3.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4zm0 2a2.7 2.7 0 1 1 0 5.4 2.7 2.7 0 0 1 0-5.4zm4.8-.8a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
          </svg>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
