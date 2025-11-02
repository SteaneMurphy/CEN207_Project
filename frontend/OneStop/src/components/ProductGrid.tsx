import './ProductGrid.css';
import ProductTile from "./ProductTile";
import type { Product } from "../components/types/types";
import React, { useEffect, useState } from "react";

interface ProductGridProps {
  matchedProducts?: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ matchedProducts }) => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [displayProducts, setDisplayProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  /*
    Loads all of the products from the product list and renders them. This list will
    be adjusted live by the useEffect hook as matched products are sent in.
  */
  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
        setDisplayProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load products:", err);
        setLoading(false);
      });
  }, []);

  /*
    Rerender products to the product grid by putting the matched products first
    and then the rest of the products after
  */
  useEffect(() => {
    if (matchedProducts && matchedProducts.length > 0) {
      const matchedIds = new Set(matchedProducts.map(p => p.id));
      const reordered = [
        ...allProducts.filter(p => matchedIds.has(p.id)),
        ...allProducts.filter(p => !matchedIds.has(p.id))
      ];
      setDisplayProducts(reordered);
    } else {
      setDisplayProducts(allProducts);
    }
  }, [matchedProducts, allProducts]);

  if (loading) return <p>Loading products...</p>;
  if (!displayProducts.length) return <p>No products to display.</p>;

  return (
    <div className="productGridMainContainer">
      {displayProducts.map((product) => (
        <ProductTile key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
