import React from "react";

interface ProductGridProps {
  title?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ title }) => {
  return (
    <div className="tempHeader">
      {title && <h2>{title}</h2>}
    </div>
  );
};

export default ProductGrid;