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
      <Sidebar />
      <ProductGrid />
      <Header />
      <Navbar />
      <Footer />
      <ProductTile />
    </>
  )
}

export default App
