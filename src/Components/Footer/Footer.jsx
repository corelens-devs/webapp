import React from 'react'
import {FaInstagram} from 'react-icons/fa'
import { FiFacebook, FiGithub } from "react-icons/fi";
import classes from "./Footer.module.css"
import { SlSocialTwitter } from "react-icons/sl";

const Footer = () => {
  return (
    <div className={classes.upper_div}>
        <div  className={classes.main_div}>
            <p>CORELENS</p>
            <p>Recommended products</p>
            <p>Some stats</p>
            <p>Process Corelens</p>
            <p>Why Corelens</p>
            <p>Download App</p>
        </div>
        <div className={classes.div2}>
            <p>@Copyright2023,All Rights Reserved</p>
            <div>
            <FiFacebook />
            <SlSocialTwitter />
            <FaInstagram />
            {/* <FiGithub/> */}

            </div>
        </div>
    </div>
  )
}

export default Footer