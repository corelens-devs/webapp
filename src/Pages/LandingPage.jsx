import React from 'react'
import Navbar from '../Components/Navbar/Navbar/Navbar'
import Home from '../Components/Navbar/Home/Home'
import AISecurity from '../Components/AISection/AISecurity'
import Services from '../Components/Services/Services'
import ProductSlider from '../Components/Products/ProductSlider'
import Features from '../Components/WhyNeed/Features'
import MobileSection from '../Components/MobileSection/MobileSection'
import BottomComponent from '../Components/Bottom/BottomComponent'
import Footer from '../Components/Footer/Footer'

const LandingPage = () => {
  return (
    <div>
        <Navbar/>
        <Home/>
        <AISecurity/>
        <Services/>
        <ProductSlider/>
        <Features/>
        <MobileSection/>
        <BottomComponent/>
        <Footer/>
    </div>
  )
}

export default LandingPage