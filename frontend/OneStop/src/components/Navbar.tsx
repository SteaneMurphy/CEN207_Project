import React from "react";

interface NavbarProps {
  title?: string;
}

const Navbar: React.FC<NavbarProps> = ({ title }) => {
  return (
    <div className="tempHeader">
      {title && <h2>{title}</h2>}
    </div>
  );
};

export default Navbar;