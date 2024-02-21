import React from 'react'
import quote from "../../Assets/quote.png"
import classes from "./Features.module.css"

const BottomSection = () => {
  return (
    <div className={classes.btm_section}>
        <img src={quote}/>
        <h5>Ensuring affordable security for all. Ground-level pricing for both products and services. Verify confidently</h5>
        <p>Vibhor Gupta</p>
        <h6>CEO, Corelens</h6>
    </div>
  )
}

export default BottomSection