import React from "react";
import './ProductTile.css';
import type { Product } from "./types/types";

interface ProductTileProps {
  product: Product;
}

const ProductTile: React.FC<ProductTileProps> = ({ product }) => {
  const imageUrl = product.image || product.images?.[0] || "/placeholder.jpg";

  return (
    <div className="productTile">
      <img src={imageUrl} alt={product.name} className="productImage" />
      <h3>{product.name}</h3>
      <p>${product.price.toFixed(2)}</p>
    </div>
  );
};

export default ProductTile;