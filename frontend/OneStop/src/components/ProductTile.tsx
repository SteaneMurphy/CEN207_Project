import React from "react";
import './ProductTile.css';

interface ProductTileProps {
}

const ProductTile: React.FC<ProductTileProps> = () => {
  return (
    <div className="productTileMainContainer">
      <p>product</p>
    </div>
  );
};

export default ProductTile;