import React from 'react'
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Home from './screens/Home/Home';
import Footer from './components/Footer/Footer';
import Error404 from './screens/Error404/Error404';
import Products from './components/Products/Products';
import AboutUs from './screens/Aboutus/Aboutus';
import ProductDetail from './components/ProductDetail/Productdetail';

const App = () => {
  return (
    <>
    <Header />
    <main>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/products' element={<Products />} />
      <Route path="/product/:productId" element={<ProductDetail />} />
      <Route path='/about' element={<AboutUs />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
    </main>
    <Footer />
    </>
    
  )
}

export default App;