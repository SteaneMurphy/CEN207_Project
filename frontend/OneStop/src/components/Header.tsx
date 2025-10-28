import React from "react";

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <div className="tempHeader">
      {title && <h2>{title}</h2>}
    </div>
  );
};

export default Header;