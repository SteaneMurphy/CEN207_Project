import { useState } from "react";
import './App.css';
import Sidebar from './components/Sidebar';
import ProductGrid from './components/ProductGrid';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatBox from './components/ChatBox';
import type { Product } from "./components/types/types";

/*
  Main application component. Single-page, no routing.
  ProductGrid and ChatBox products are set at this parent component.
  Changes to these props, causes rerender of both components.
*/

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  localStorage.removeItem("chatHistory");

  return (
    <div>
      <Navbar />
      <div className="bodyMainContainer">
        <Sidebar />
        <ProductGrid matchedProducts={products} />
        <ChatBox onProductsMatched={setProducts} />
      </div>
      <Footer />
    </div>
  )
}

export default App
