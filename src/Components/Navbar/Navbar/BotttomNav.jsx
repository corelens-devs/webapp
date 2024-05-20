import React from 'react'
import {Link} from "react-router-dom"
import classes from "./Navbar.module.css"

const BotttomNav = () => {
  return (
    <div className={classes.btm_div}>
        <ul>
            <li>
    <a href="#Aihome">Home</a>
            </li>
            <li>
    <a href="#services">What we Offer</a>
            </li>
            <li>
    <a href="#product">Our Products</a>
            </li>
            <li>
    <a href="#mobile-section">Process</a>
            </li>
            <li>
    <a href="#btm-section">Download app</a>
            </li>
        </ul>
    </div>
  )
}

export default BotttomNav