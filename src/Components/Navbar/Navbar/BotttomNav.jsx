import React from 'react'
import {Link} from "react-router-dom"
import classes from "./Navbar.module.css"

const BotttomNav = () => {
  return (
    <div className={classes.btm_div}>
        <ul>
            <li>
    <Link to ="/">A.I Home Security</Link>
            </li>
            <li>
    <Link to ="/">What we Offer</Link>
            </li>
            <li>
    <Link to ="/">Our Products</Link>
            </li>
            <li>
    <Link to ="/">Process</Link>
            </li>
            <li>
    <Link to ="/">Download app</Link>
            </li>
        </ul>
    </div>
  )
}

export default BotttomNav