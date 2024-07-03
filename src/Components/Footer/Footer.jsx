import React, { useState } from 'react'
import {FaInstagram, FaPhone, FaPhoneAlt} from 'react-icons/fa'
import { FiFacebook, FiGithub } from "react-icons/fi";
import classes from "./Footer.module.css"
import { FaXTwitter } from "react-icons/fa6";
import {useNavigate} from "react-router-dom"
import logo from "../../Assets/logo.png"
import { IoLocationSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";


const Footer = () => {
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  const togglePrivacyPolicy = () => {
      setShowPrivacyPolicy(prevState => !prevState);
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
          <input type="text" placeholder='Enter Email ID' />
          <button>Submit</button>
        </div>
        <div  className={classes.main_div1}>
           <img src={logo} style={{width:"100px"}}/>
            <p style={{cursor:"pointer"}} onClick={() => handleNavigation('/term-use')}>Terms of Use</p>
            <p style={{cursor:"pointer"}} onClick={() => handleNavigation('/term-sales')}>Terms of Sales</p>
            <p style={{cursor:"pointer"}} onClick={() => handleNavigation('/term-condition')}>Term & Condition</p>
            <p style={{cursor:"pointer"}} onClick={() => handleNavigation('/privacy-policy')}>Privacy Policy</p>
            <p style={{cursor:"pointer"}} onClick={togglePrivacyPolicy}>Contact Us</p>
            <p style={{cursor:"pointer"}}>Download App</p>
        </div>
        {showPrivacyPolicy && (
                <div className={classes.contactinfo}>
                <div className={classes.contactsection}>
                    <h3>Get In Touch</h3>
                    {/* <p>Lorem ipsum dolor sit amet.</p> */}
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
            <p>@Copyright2024,All Rights Reserved</p>
            <div>
            <FiFacebook />
            <FaXTwitter />
            <FaInstagram />
            {/* <FiGithub/> */}

            </div>
        </div>
    </div>
  )
}

export default Footer