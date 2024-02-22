import React from 'react'
import AiImage from "../../Assets/AiImage.png"
import classes from "./Ai.module.css"
import Heading from '../Heading/Heading'
import { FaCircle } from 'react-icons/fa'

const AISecurity = () => {
    return (
        <div id='Aihome' className={classes.ai_home}>
            <Heading heading={"A.I Home Security"} para={"Experience ultimate in home comfort, convenience, and control with our smart home solutions."}/>
            <div className={classes.btm_btn_div}>
                <button className={classes.btm_btn}><FaCircle /><span><span>Download on the</span>App Store</span></button>
                <button  className={classes.btm_btn}> <FaCircle /><span><span>Get It On </span>Google Play</span></button>
            </div>
            <img className={classes.img} src={AiImage}  />
           
            </div>
    )
}

export default AISecurity