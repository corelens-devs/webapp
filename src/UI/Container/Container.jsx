import React from 'react'
import classes from './Container.module.css'


const Container = (props) => {

  return (
    <div  className={`${classes.container} ${props.cls}`}>
        {props.children}
    </div>
  )
}

export default Container