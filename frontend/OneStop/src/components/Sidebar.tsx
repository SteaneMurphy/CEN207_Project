import React from "react";

interface SidebarProps {
  title?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ title }) => {
  return (
    <div className="tempHeader">
      {title && <h2>{title}</h2>}
    </div>
  );
};

export default Sidebar;