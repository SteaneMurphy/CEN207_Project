import React, { useState } from "react";
import './App.css';
import Sidebar from './components/Sidebar';
import ProductGrid from './components/ProductGrid';
// import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatBox from './components/ChatBox';
import type { Product } from "./components/types/types";

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  return (
    <div>
      {/* <Header /> */}
      <Navbar />
      <div className="bodyMainContainer">
        <Sidebar />
        <ProductGrid products={products} />
        <ChatBox onProductsMatched={setProducts} />
      </div>
      <Footer />
    </div>
  )
}

export default App
