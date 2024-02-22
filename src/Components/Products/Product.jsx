import React, { useState } from 'react'
import camera from "../../Assets/camera.png"
import classes from "./Product.module.css"
import './product.css'
import { IoMdStar } from "react-icons/io";
import ProductDetail from './ProductDetails/ProductDetail';

const Product = (props) => {
  const [show, setShow] = useState(false)
  const handleShow = () => setShow(!show)
  return (
    <>
    <div className={`${classes.card}`}>
        <div className={`${classes.card1} ${props.cls}`} >
            <img src={camera} alt="" />
            <button onClick={handleShow}>Buy Now</button>
        </div>
        <h6 className={classes.h6}>Indoor PTZ Camera</h6>
        <div className={classes.div2}>
            <p>₹600</p>

            <button><IoMdStar />
4.5 (78)</button>
        </div>
    </div>
    <ProductDetail
        show={show}
        onHide={() => setShow(false)}
      />
    {/* {show && <ProductDetail isPopup={show} popupFunc={setShow} /> } */}
    </>
  )
}

export default Product