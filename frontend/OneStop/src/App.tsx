import { useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import ProductGrid from './components/ProductGrid'
import Header from './components/Header'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProductTile from './components/ProductTile'

function App() {

  return (
    <>
      <Sidebar title={"sidebar component"} />
      <ProductGrid title={"product grid component"} />
      <Header title={"header component"} />
      <Navbar title={"navbar component"} />
      <Footer title={"footer component"} />
      <ProductTile title={"product tile component"} />
    </>
  )
}

export default App
