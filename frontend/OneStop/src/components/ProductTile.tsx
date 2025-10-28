import React from "react";

interface ProductTileProps {
  title?: string;
}

const ProductTile: React.FC<ProductTileProps> = ({ title }) => {
  return (
    <div className="tempHeader">
      {title && <h2>{title}</h2>}
    </div>
  );
};

export default ProductTile;