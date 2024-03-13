import React from 'react'
import classes from "./Sidebar.module.css"
import { RxCross2 } from 'react-icons/rx'


const Sidebar = ({ sidebar, setSidebar }) => {
        return (
                <div className={`${classes.btm_div} ${sidebar ? classes.show : ''}`}>
                        <div className={classes.side_bn}>
                                <button onClick={() => { setSidebar(false) }}><RxCross2 /></button>
                        </div>
                        <div >
                                <ul>
                                        <li onClick={()=> sidebar && setSidebar(false)}>
                                                <a href="#Aihome">A.I Home Security</a>
                                        </li>
                                        <li onClick={()=> sidebar && setSidebar(false)}>
                                                <a href="#services">What we Offer</a>
                                        </li>
                                        <li onClick={()=> sidebar && setSidebar(false)}>
                                                <a href="#product">Our Products</a>
                                        </li>
                                        <li onClick={()=> sidebar && setSidebar(false)}>
                                                <a href="#mobile-section">Process</a>
                                        </li>
                                        <li onClick={()=> sidebar && setSidebar(false)}>
                                                <a href="#btm-section">Download app</a>
                                        </li>
                                </ul>
                        </div>

                </div>
        )
}

export default Sidebar