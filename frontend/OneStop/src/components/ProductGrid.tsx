import React from "react";
import './ProductGrid.css';
import ProductTile from "./ProductTile";

interface ProductGridProps {
}

const ProductGrid: React.FC<ProductGridProps> = () => {
  return (
    <div className="productGridMainContainer">
      {[...Array(10)].map((_, i) => (
        <ProductTile key={i} />
      ))}
    </div>
  );
};

export default ProductGrid;