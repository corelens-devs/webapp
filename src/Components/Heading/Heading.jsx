import React from 'react'
import classes from "./Heading.module.css"

const Heading = (props) => {
  return (
    <div className={`${classes.head} ${props.cls}`}>
        <h4>{props.heading}</h4>
            <p>{props.para}</p>
    </div>
  )
}

export default Heading