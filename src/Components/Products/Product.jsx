import React, { useEffect, useState } from 'react'
import camera from "../../Assets/camera.png"
import classes from "./Product.module.css"
import './product.css'
import { IoMdStar } from "react-icons/io";
import ProductDetail from './ProductDetails/ProductDetail';
import { DiscountFunction } from '../DiscountFunction/DiscountFunction';
import AOS from 'aos'
import 'aos/dist/aos.css';

const Product = (props) => {
  let index = props.index
  const[productData, setProductData] = useState({})
  let data = props?.data
  // console.log(data.actualAmount)
  // console.log(data.discount)
  const [show, setShow] = useState(false)
  const handleShow = (id, data) => {
    console.log(id)
    setProductData(data)
    setShow(!show)

  }
  useEffect(() => {
    AOS.init({
        duration: 1000,
        once: true,
    });
}, []);
  return (
    <>
    <div data-aos="fade-up"                                      data-aos-delay={(index + 1) * 100}  className={`${classes.card}`}  onClick={props?.onClick}>
    {/* <div className={`${classes.card}`}  onClick={() =>handleShow(data?.id, data)}> */}
        <div className={`${classes.card1} ${props.cls}`} >
            <img src={data?.img} alt="" />
            <button>Buy Now</button>
        </div>
        <h6 className={classes.h6}>{data?.name}</h6>
        <div className={classes.div2}>
            <p>₹ {DiscountFunction(data)}</p>

            {/* <button><IoMdStar />
4.5 (78)</button> */}
        </div>
    </div>
    <ProductDetail
        show={show}
        onHide={() => setShow(false)}
        productData={productData}
      />
    {/* {show && <ProductDetail isPopup={show} popupFunc={setShow} /> } */}
    </>
  )
}

export default Product