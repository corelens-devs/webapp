import React from 'react'
import quote from "../../Assets/quote.png"
import classes from "./Features.module.css"

const BottomSection = () => {
  return (
    <div className={classes.btm_section}>
        <img src={quote}/>
        <h5>By 2040, my mission is to assure safety in every Indian home and vehicles , increasing nationwide security</h5>
        <p>Vibhor Gupta</p>
        <h6>CEO, Corelens</h6>
    </div>
  )
}

export default BottomSection