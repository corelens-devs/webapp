import React from 'react'
import classes from './Modal.module.css'
import Container from '../../UI/Container/Container'

const Modal = (props) => {
  return (
    <>
      <div onClick={() => props.Func(false)} className={`${classes.backdrop} ${props.value === true ? classes.visible : ''}`}></div>
      <Container cls={`${props.cls} ${classes.modal} ${props.value === true ? classes.visible : ''}`}>
        {props.children}
      </Container>
    </>
  )
}

export default Modal