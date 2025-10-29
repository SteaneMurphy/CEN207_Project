import './App.css'
import Sidebar from './components/Sidebar'
import ProductGrid from './components/ProductGrid'
// import Header from './components/Header'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {

  return (
    <div>
      {/* <Header /> */}
      <Navbar />
      <div className="bodyMainContainer">
        <Sidebar />
        <ProductGrid />
      </div>
      <Footer />
    </div>
  )
}

export default App
