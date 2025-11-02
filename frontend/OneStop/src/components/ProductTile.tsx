import React from "react";
import './ProductTile.css';
import type { Product } from "./types/types";

interface ProductTileProps {
  product: Product;
}

/*
  Product information sent in from parent component via product
  array.

  Product information like price, image and description is set
  in the returned JSX component.
*/

const ProductTile: React.FC<ProductTileProps> = ({ product }) => {
  const imageUrl = product.images?.[0] || "/placeholder.jpg";
  console.log("Product images:", product.images);

  return (
    <div className="productTile">
      <div>
        <img src={imageUrl} alt={product.name} className="productImage" />
        <h3>{product.name}</h3>
        <p className="productDescription">{product.description}</p>
      </div>
      <div className="productPriceContainer">
        <p className="productPrice">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductTile;