import React, { useState } from "react";
import './Sidebar.css';

const categories = [
  "All Products",
  "Home & Kitchen",
  "Electronics",
  "Sports & Outdoors",
  "Clothing & Accessories",
  "Beauty & Health",
  "Automotive",
  "Toys & Games",
];

interface SidebarProps {
  onCategorySelect?: (category: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onCategorySelect }) => {
  const [activeCategory, setActiveCategory] = useState("All Products");

  const handleClick = (category: string) => {
    setActiveCategory(category);
    if (onCategorySelect) onCategorySelect(category);
  };

  return (
    <div className="sidebarMainContainer">
      <h2 className="sidebarHeader">Categories</h2>
      <div className="categoryList">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`categoryButton ${activeCategory === cat ? "active" : ""}`}
            onClick={() => handleClick(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
