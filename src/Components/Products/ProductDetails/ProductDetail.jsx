import React, { useState } from 'react'
import classes from './ProductDetail.module.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DetailSlider from './DetailSlider';
import scan1 from "../../../Assets/scan1.png"
import scan2 from "../../../Assets/scan2.png"
import scan3 from "../../../Assets/scan3.png"
import scan4 from "../../../Assets/scan4.png"
import scan5 from "../../../Assets/scan5.png"
import { FaPhone, FaPhoneAlt } from 'react-icons/fa';
import { ImMobile } from 'react-icons/im';

const ProductDetail = (props) => {

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className={classes.head_modal} closeButton>Product Detail</Modal.Header>

      <Modal.Body className={classes.bdy}>
        <div className={classes.main_div}>
          <DetailSlider />
          <div>
            <h1 className={classes.head}>Corelens Outdoor PTZ Wireless CCTV Camera| Alarm | Motion Alert | Color Night Vision | SD Card Support</h1>
            <p className={classes.para}>Main Highlights</p>
            <div className={classes.main_div2}>
             <div>
             <div className={classes.main_div3}>
                <img src={scan1} alt="" />
                <p>Sample test here</p>
              </div>
              <div className={classes.main_div3}>
                <img src={scan2} alt="" />
                <p>Sample test here</p>
              </div>
              <div className={classes.main_div3}>
                <img src={scan3} alt="" />
                <p>Sample test here</p>
              </div>
              <div className={classes.main_div3}>
                <img src={scan4} alt="" />
                <p>Sample test here</p>
              </div>
              <div className={classes.main_div3}>
                <img src={scan5} alt="" />
                <p>Sample test here</p>
              </div>
             </div>
            </div>
            <div>
              <p className={`${classes.para} ${classes.p2}`}>Technical highlights</p>
              {/* <ul className={classes.ul}> */}
              <div className={classes.ul}>
                <div className={classes.inn_ul}>
                  <p>Brand</p> <span>Corelens</span>
                </div>
                <div className={classes.inn_ul}>
                  <p>Model Name</p> <span>V45</span>
                </div>
                <div className={classes.inn_ul}>
                  <p>Connectivity Technology</p> <span>Wired</span>
                </div>
                <div className={classes.inn_ul}>
                  <p>Special Feature</p> <span>PTZ Technology</span>
                </div>
                <div className={classes.inn_ul}>
                  <p>Indoor/Outdoor Usage</p> <span>Outdoor</span>
                </div>
                <div className={classes.inn_ul}>
                  <p>Compatible Devices</p> <span>Laptop, Smart Phone</span>
                </div>
                <div className={classes.inn_ul}>
                  <p>Power Source</p> <span>Corded Electric</span>
                </div>
                <div className={classes.inn_ul}>
                  <p>Connectivity Protocol</p> <span>HomePlug</span>
                </div>
                <div className={classes.inn_ul}>
                  <p>Controller Type</p> <span>Android</span>
                </div>
              </div>
              {/* <li>
          <p>Special Feature</p> <span>PTZ Technology</span>
        </li>
        <li>
          <p>Indoor/Outdoor Usage</p> <span>Outdoor</span>
        </li>
        <li>
          <p>Compatible Devices</p> <span>Laptop, Smart Phone</span>
        </li>
        <li>
          <p>Power Source</p> <span>Corded Electric</span>
        </li>
        <li>
          <p>Connectivity Protocol</p> <span>HomePlug</span>
        </li>
        <li>
          <p>Controller Type</p> <span>Android</span>
        </li>
        </ul> */}
            </div>
            <div>
              <h1 className={classes.head2}>Special Price</h1>
              <p className={classes.para2}>₹600 <span>10% Off</span></p>
            </div>
            <div className={classes.btm_btn_div}>
                <button className={classes.buy_btn} style={{background: "black"}}>Order Through Call <FaPhoneAlt />

</button>
                <button className={classes.buy_btn}>Order Through App <ImMobile style={{fontSize:"18px"}} />
</button>
            </div>
            
          </div>
        </div>
      </Modal.Body>

    </Modal>
  )
}

export default ProductDetail