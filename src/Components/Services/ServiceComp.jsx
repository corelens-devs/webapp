import React from 'react'
import classes from "./Service.module.css"

const ServiceComp = (props) => {
  return (
    <div className={classes.card}>
      <img src={props.img} alt='Corelens CCTV Camera for Home Security' />
      <h4>{props.heading}</h4>
      <p className={props.cls}>{props.para}</p>
    </div>
  )
}

export default ServiceComp