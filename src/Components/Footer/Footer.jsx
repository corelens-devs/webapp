import React from 'react'
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa'
import classes from "./Footer.module.css"

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
            <FaFacebookF />
            <FaTwitter />
            <FaInstagram />

            </div>
        </div>
    </div>
  )
}

export default Footer