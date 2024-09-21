import React, { useState } from 'react'
import Navbar from '../Components/Navbar/Navbar/Navbar'
import Home from '../Components/Navbar/Home/Home'
import AISecurity from '../Components/AISection/AISecurity'
import Services from '../Components/Services/Services'
import ProductSlider from '../Components/Products/ProductSlider'
import Features from '../Components/WhyNeed/Features'
import MobileSection from '../Components/MobileSection/MobileSection'
import BottomComponent from '../Components/Bottom/BottomComponent'
import Footer from '../Components/Footer/Footer'
import classes from "./Landing.module.css"
import Faq from '../Components/FAQ/Faq'
import BlogSection from '../Components/BlogSection/BlogSection'

const LandingPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  return (
    <div>
      <Navbar navv={true} onSearchChange={handleSearchChange} />
      <Home />
      <div className={classes.main_div}>
        <AISecurity />
        <Services />
        <ProductSlider searchTerm={searchTerm} />
        <Features />
      </div>
      <MobileSection />
      <div className={classes.main_div}>
        <Faq />
        <BlogSection />
        <BottomComponent />
      </div>
      <Footer />
    </div>
  )
}

export default LandingPage