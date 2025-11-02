import React from "react";

/*
  Basic cart icon SVG. Importable with the ability to adjust the 
  size and colour
*/

type CartIconProps = {
  size?: number;         
  colour?: string;              
};

const CartIcon: React.FC<CartIconProps> = ({ size = 24, colour = "currentColor" }) => {
  const svgStyle = { width: size, height: size, display: "block", colour };

  return (
    <svg viewBox="0 0 24 24" role="img" aria-hidden="true" style={svgStyle} xmlns="http://www.w3.org/2000/svg">
      <title>CartIcon</title>
      <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3h2l1.6 9.6a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L21 6H6" />
        <circle cx="9" cy="20" r="1.6" />
        <circle cx="18" cy="20" r="1.6" />
      </g>
    </svg>
  );
};

export default CartIcon;
