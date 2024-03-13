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
import classes from "./Landing.module.css"
import { FaSquareWhatsapp } from 'react-icons/fa6'

const LandingPage = () => {
  return (
    <div>
       <FaSquareWhatsapp
 className={classes.flt_icn} />
            {/* <FaWhatsapp className={classes.flt_icn} /> */}

        <Navbar/>
        <Home/>
       <div className={classes.main_div}>
       <AISecurity/>
        <Services/>
        <ProductSlider/>
        <Features/>
       </div>
        <MobileSection/>
        <div className={classes.main_div}>
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