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
    <div data-aos="fade-left"                                      data-aos-delay={(index + 1) * 100}  className={`${classes.card}`}  onClick={props?.onClick}>
    {/* <div className={`${classes.card}`}  onClick={() =>handleShow(data?.id, data)}> */}
        <div className={`${classes.card1} ${props.cls}`} >
            <img src={data?.img} alt="" />
            <button>Buy Now</button>
        </div>
        <h6 className={classes.h6}>{data?.name}</h6>
        <p className={classes.para}>{data?.cat}</p>
        <div className={classes.div2}>
          <p className={classes.para2}> Rs. {data.saleAmount} 
          
        {data?.actualAmount && <span style={{textDecoration: "line-through"}}>Rs. {data.actualAmount} </span>}
         {data.discount &&  <span style={{color:"#FF774F", fontWeight:"400"}}>({data.discount} OFF)</span>}
          </p>
            {/* <p>₹ {DiscountFunction(data)}</p> */}

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