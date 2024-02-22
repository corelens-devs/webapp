import React from 'react'
import camera from "../../../Assets/camera.png"
import classes from "./ProductDetail.module.css"
const ProDetail = () => {
  return (
         <div className={`${classes.card}`}>
        <div className={`${classes.card1} `} >
            <img src={camera} alt="" />
        </div>
    </div>
    
  )
}

export default ProDetail