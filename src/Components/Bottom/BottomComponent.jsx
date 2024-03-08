import React from 'react'
import { FaCircle, FaRegCircle } from 'react-icons/fa'
import Bottom_img from "../../Assets/Bottom_img.png"
import phoneResponsive from "../../Assets/phoneResponsive.png"
import classes from "./BottomComp.module.css"
import { ImAppleinc } from 'react-icons/im'
import { TiVendorAndroid } from 'react-icons/ti'

const BottomComponent = () => {
  return (
    <div className={classes.main_div}> 
            <img src={Bottom_img} />
            <img src={phoneResponsive} className={classes.mob_res}/>
        <div>
            <h1>Your Gateway to 24/7 Security with Our Surveillance App</h1>
            <p>Experience ultimate in home comfort, convenience, and control with our smart home solutions.</p>
            {/* <div className={classes.btm_btn_div}>
                <button className={classes.btm_btn}><FaCircle /><span><span> Download on the </span>App Store</span></button>
                <button  className={classes.btm_btn}> <FaCircle /><span><span>Get It On </span>Google Play</span></button>
            </div> */}
            <div className={classes.btm_btn_div}>
                <button className={classes.btm_btn}><ImAppleinc style={{fontSize:"30px"}}/>
<span><span>Download on the</span>App Store</span></button>
                <button  className={classes.btm_btn}> <TiVendorAndroid style={{fontSize:"40px"}} />
<span><span>Get It On </span>Google Play</span></button>
            </div>
            </div>
        
    </div>
  )
}

export default BottomComponent