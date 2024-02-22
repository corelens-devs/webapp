import React from 'react'
import classes from "./Sidebar.module.css"
import { RxCross2 } from 'react-icons/rx'


const Sidebar = ({sidebar, setSidebar}) => {
  return (
    <div className={`${classes.btm_div} ${sidebar ? classes.show : ''}`}>
          <div className={classes.side_bn}>
          <button  onClick={() => {setSidebar(false) }}><RxCross2 /></button>
          </div>
      <div >
      <ul>
            <li>
    <a href="#Aihome">A.I Home Security</a>
            </li>
            <li>
    <a href="#services">What we Offer</a>
            </li>
            <li>
    <a href="#product">Our Products</a>
            </li>
            <li>
    <a href="/">Process</a>
            </li>
            <li>
    <a href="/">Download app</a>
            </li>
        </ul>
      </div>
      
    </div>
  )
}

export default Sidebar