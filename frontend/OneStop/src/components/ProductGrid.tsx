import './ProductGrid.css';
import ProductTile from "./ProductTile";
import type { Product } from "../components/types/types";
import React from "react";

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  if (!products?.length) {
    return <p>No products to display.</p>;
  }

  return (
    <div className="productGridMainContainer">
      {products.map((product) => (
        <ProductTile key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
