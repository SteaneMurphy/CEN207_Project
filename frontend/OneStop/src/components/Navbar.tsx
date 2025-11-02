import React from "react";
import "./Navbar.css";
import CartIcon from "./CartIcon";

/*
  Navabr component with standard link elements, login button
  and cart button.

  CartIcon is a customisable SVG component.
*/

const Navbar: React.FC = () => {
  return (
    <nav className="navbarMainContainer">
      <div className="logo">
        <span>OneStop</span>
      </div>

      <ul className="navLinks">
        <li>Home</li>
        <li>Products</li>
        <li>About</li>
        <li>Contact</li>
      </ul>

      <div className="navActions">
        <input 
          type="text" 
          placeholder="Search products..." 
          className="searchBar"
        />
        <button className="navButton">Login</button>
        <button className="navButton cartButton">
          <CartIcon size={20} colour={'#007bff'}/>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
