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
import { FaSquareWhatsapp } from 'react-icons/fa6'
import { FaWhatsapp } from 'react-icons/fa'
import Faq from '../Components/FAQ/Faq'

const LandingPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };
  const whatsappNumber = '+91 9999973124';

  const openWhatsApp = () => {
      const url = `https://wa.me/${whatsappNumber}`;
      window.open(url, '_blank');
  };

  return (
    <div>
       
 <div className={classes.float}  onClick={openWhatsApp}>
 <FaWhatsapp />
 </div>
 

        <Navbar navv={true} onSearchChange={handleSearchChange} />
        <Home/>
       <div className={classes.main_div}>
       <AISecurity/>
        <Services/>
        <ProductSlider searchTerm={searchTerm} />
        <Features/>
       </div>
        <MobileSection/>
        <div className={classes.main_div}>
          <Faq/>
        <BottomComponent/>
        </div>
        <Footer/>
{/* 
        <Navbar/>
        <Home/>
        <Routes>
        <Route path='/Aihome' element={ <AISecurity/>}/>
        </Routes>
        <Routes>
        <Route path='/services' element={<Services/>}/>
        </Routes>
        <Routes>
        <Route path='/product' element={  <ProductSlider/>}/>
        </Routes>
        <Routes>
        <Route path='/features' element={<Features/>}/>
        </Routes>
        <Routes>
        <Route path='/mobile' element={<MobileSection/>}/>
        </Routes>        
        <Routes>
        <Route path='/bottom' element={<BottomComponent/>}/>
        </Routes>
        <Footer/> */}

    </div>
  )
}

export default LandingPage