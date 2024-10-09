import React, { useState } from 'react'
import {FaInstagram, FaPhoneAlt} from 'react-icons/fa'
import { FiFacebook } from "react-icons/fi";
import classes from "./Footer.module.css"
import { FaXTwitter } from "react-icons/fa6";
import {useNavigate} from "react-router-dom"
import logo from "../../Assets/logo.png"
import { IoLocationSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";


const Footer = () => {
  const [email, setEmail] = useState('');
  const [buttonText, setButtonText] = useState('Submit');
  const [buttonColor, setButtonColor] = useState('#00398E');
  const [isContactOpen, setIsContactOpen] = useState(false);
 
  const handleSubmit = () => {
    if (validateEmail(email)) {
      setButtonText('Submitted');
      setButtonColor('green');
      alert('Thank you for subscribing to our newsletter');
      
      setTimeout(() => {
        setButtonText('Submit');
        setButtonColor('#00398E');
        setEmail('');
      }, 2000); // 3 seconds delay
    } else {
      alert('Please enter a correct email');
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const navigate = useNavigate()
  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };
  
  return (
    <div className={classes.upper_div}>
        <div  className={classes.main_div}>
            <p>Subscribe to our Newsletter</p>
          <input type="email" placeholder='Enter Email ID'  value={email}
        onChange={(e) => setEmail(e.target.value)} />
          <button  style={{ backgroundColor: buttonColor }} onClick={handleSubmit}>{buttonText}</button>
        </div>
        <div  className={classes.main_div1}>
           <img src={logo} style={{width:"100px"}} alt='Corelens logo' />
            <p style={{cursor:"pointer"}} onClick={() => handleNavigation('/term-use')}>Terms of Use</p>
            <p style={{cursor:"pointer"}} onClick={() => handleNavigation('/term-sales')}>Terms of Sales</p>
            <p style={{cursor:"pointer"}} onClick={() => handleNavigation('/term-condition')}>Term & Condition</p>
            <p style={{cursor:"pointer"}} onClick={() => handleNavigation('/privacy-policy')}>Privacy Policy</p>
            <p style={{cursor:"pointer"}} onClick={() => setIsContactOpen(!isContactOpen)}>Contact Us</p>
            <p style={{cursor:"pointer"}}>Download App</p>
        </div>
        {isContactOpen && (
                <div className={classes.contactinfo}>
                <div className={classes.contactsection}>
                    <h3>Get In Touch</h3>
                </div>
                <div className={classes.top_contact}>
                <div className={classes.top_div}>
           <div className={classes.icon}>
           <FaPhoneAlt style={{fontSize:"18px"}} />

           </div>

                  <div className={classes.contact}>
                  <p>Give us a call</p>
                  <a href="tel:18003134207">1800-313-4207</a>
                  </div>
                </div>
                <div className={classes.top_div}>
                <div className={classes.icon}>
                <MdEmail />
                </div>

                   <div  className={classes.contact}>
                   <p>Send us an email</p>
                    <a href="mailto:customercare@corelens.in">customercare@corelens.in</a>
                    <br/>
                    <a href="mailto:connect@corelens.in">connect@corelens.in</a>
                   </div>
                </div>
                <div className={classes.top_div}>
              <div className={classes.icon1}>
              <IoLocationSharp />
              </div>

                  <div className={classes.contact}>
                  <p>Visit us</p>
                    <address>
                        <span>VIBHOR ELECTRONICS</span><br />
                        No 3, building 2287/39 MS ROAD, K. PUL, Delhi-110006
                    </address>
                  </div>
                </div>
                </div>
            </div>
            )}
        <div className={classes.div2}>
            <p>copyright © vibhor gupta. All rights reserved</p>
            <div>
            <FiFacebook />
            <FaXTwitter />
            <FaInstagram />
            </div>
        </div>
    </div>
  )
}

export default Footer