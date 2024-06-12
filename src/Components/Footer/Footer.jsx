import React from 'react'
import {FaInstagram} from 'react-icons/fa'
import { FiFacebook, FiGithub } from "react-icons/fi";
import classes from "./Footer.module.css"
import { FaXTwitter } from "react-icons/fa6";
import {useNavigate} from "react-router-dom"
import logo from "../../Assets/logo.png"
const Footer = () => {
  const navigate = useNavigate()
  return (
    <div className={classes.upper_div}>
        <div  className={classes.main_div}>
            <p>Subscribe to our Newsletter</p>
          <input type="text" placeholder='Enter Email ID' />
          <button>Submit</button>
        </div>
        <div  className={classes.main_div1}>
           <img src={logo} style={{width:"100px"}}/>
            <p style={{cursor:"pointer"}} onClick={() => navigate('/term-use')}>Terms of Use</p>
            <p style={{cursor:"pointer"}} onClick={() => navigate('/term-sales')}>Terms of Sales</p>
            <p style={{cursor:"pointer"}} onClick={() => navigate('/term-condition')}>Term & Condition</p>
            <p style={{cursor:"pointer"}} onClick={() => navigate('/privacy-policy')}>Privacy Policy</p>
            <p style={{cursor:"pointer"}}>Download App</p>
        </div>
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