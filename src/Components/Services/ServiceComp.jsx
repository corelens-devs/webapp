import React from 'react'
import classes from "./Service.module.css"

const ServiceComp = (props) => {
  return (
    <div className={classes.card}>
<img src={props.img}/>
<h4>{props.heading}</h4>
<p>{props.para}</p>
    </div>
  )
}

export default ServiceComp