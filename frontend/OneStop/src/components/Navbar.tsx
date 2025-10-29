import React from "react";
import './Navbar.css';

interface NavbarProps {
}

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <div className="navbarMainContainer">
      <div className="logo">
        <span>OneStop</span>
      </div>
    </div>
  );
};

export default Navbar;