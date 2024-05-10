import React from 'react'
import camera from "../../../Assets/camera.png"
import classes from "./ProductDetail.module.css"
const ProDetail = (props) => {
  return (
         <div className={`${classes.card}`}>
        <div className={`${classes.card1} `} >
            <img src={props?.img} alt="" />
        </div>
    </div>
    
  )
}

export default ProDetail