import React from "react";

interface FooterProps {
  title?: string;
}

const Footer: React.FC<FooterProps> = ({ title }) => {
  return (
    <div className="tempHeader">
      {title && <h2>{title}</h2>}
    </div>
  );
};

export default Footer;