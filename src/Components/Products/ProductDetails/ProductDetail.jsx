// import React, { useState } from 'react'
// import classes from './ProductDetail.module.css'
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import DetailSlider from './DetailSlider';

// import { FaPhone, FaPhoneAlt } from 'react-icons/fa';
// import { ImMobile } from 'react-icons/im';
// import MainHighlight from './MainHighlight';

// const ProductDetail = (props) => {
//   let data = props?.productData
//   console.log(data)

//   return (
//     <Modal
//       {...props}
//       size="lg"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//     >
//       <Modal.Header className={classes.head_modal} closeButton>Product Detail</Modal.Header>

//       <Modal.Body className={classes.bdy}>
//         <div className={classes.main_div}>
//           <DetailSlider />
//           <div>
//             <h1 className={classes.head}>Corelens Outdoor PTZ Wireless CCTV Camera| Alarm | Motion Alert | Color Night Vision | SD Card Support</h1>
//             <p className={classes.para}>Main Highlights</p>
//             <div className={classes.main_div2}>
//              <MainHighlight/>
//             </div>
//             <div>
//               <p className={`${classes.para} ${classes.p2}`}>Technical highlights</p>
//               {/* <ul className={classes.ul}> */}
//               <div className={classes.ul}>
//                 <div className={classes.inn_ul}>
//                   <p>Brand</p> <span>Corelens</span>
//                 </div>
//                 <div className={classes.inn_ul}>
//                   <p>Model Name</p> <span>V45</span>
//                 </div>
//                 <div className={classes.inn_ul}>
//                   <p>Connectivity Technology</p> <span>Wired</span>
//                 </div>
//                 <div className={classes.inn_ul}>
//                   <p>Special Feature</p> <span>PTZ Technology</span>
//                 </div>
//                 <div className={classes.inn_ul}>
//                   <p>Indoor/Outdoor Usage</p> <span>Outdoor</span>
//                 </div>
//                 <div className={classes.inn_ul}>
//                   <p>Compatible Devices</p> <span>Laptop, Smart Phone</span>
//                 </div>
//                 <div className={classes.inn_ul}>
//                   <p>Power Source</p> <span>Corded Electric</span>
//                 </div>
//                 <div className={classes.inn_ul}>
//                   <p>Connectivity Protocol</p> <span>HomePlug</span>
//                 </div>
//                 <div className={classes.inn_ul}>
//                   <p>Controller Type</p> <span>Android</span>
//                 </div>
//               </div>
//               {/* <li>
//           <p>Special Feature</p> <span>PTZ Technology</span>
//         </li>
//         <li>
//           <p>Indoor/Outdoor Usage</p> <span>Outdoor</span>
//         </li>
//         <li>
//           <p>Compatible Devices</p> <span>Laptop, Smart Phone</span>
//         </li>
//         <li>
//           <p>Power Source</p> <span>Corded Electric</span>
//         </li>
//         <li>
//           <p>Connectivity Protocol</p> <span>HomePlug</span>
//         </li>
//         <li>
//           <p>Controller Type</p> <span>Android</span>
//         </li>
//         </ul> */}
//             </div>
//             <div>
//               <h1 className={classes.head2}>Special Price</h1>
//               <p className={classes.para2}>₹600 <span>10% Off</span></p>
//             </div>
//             <div className={classes.btm_btn_div}>
//                 <button className={classes.buy_btn} style={{background: "black"}}>Order Through Call <FaPhoneAlt />

// </button>
//                 <button className={classes.buy_btn}>Order Through App <ImMobile style={{fontSize:"18px"}} />
// </button>
//             </div>

//           </div>
//         </div>
//       </Modal.Body>

//     </Modal>
//   )
// }

// export default ProductDetail
import React, { useState } from 'react'
import classes from './ProductDetail.module.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DetailSlider from './DetailSlider';

import { FaPhone, FaPhoneAlt } from 'react-icons/fa';
import { ImMobile } from 'react-icons/im';
import MainHighlight from './MainHighlight';
import { DiscountFunction } from '../../DiscountFunction/DiscountFunction';

const ProductDetail = (props) => {
  let data = props?.productData
  console.log(data)

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
          <DetailSlider  img={data.img}/>
          <div>
            <h1 className={classes.head}>{data?.name}</h1>
            <p className={classes.para}>Main Highlights</p>
            <div className={classes.main_div2}>
              <MainHighlight data={data?.mainhighlight} />
           
            </div>
              <p className={`${classes.para} ${classes.p2}`}>Technical highlights</p>
           {data?.technicalHightlight?.length > 0  ?   data?.technicalHightlight?.map((item) => (
            <div className={classes.ul}>
            <div className={classes.inn_ul}>
              <p>{item.title}</p> <span>{item.description}</span>
            </div>
             </div>
           )):  <div>
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
              
            </div>}
            <div>
              <h1 className={classes.head2}>Special Price</h1>
              <p className={classes.para2}>₹{DiscountFunction(data)} <p className={classes.p9}>{data.actualAmount}</p> <span>{data.discount}% Off</span></p>
            </div>
            <div className={classes.btm_btn_div}>
              <button className={classes.buy_btn} style={{ background: "black" }}>Order Through Call <FaPhoneAlt />

              </button>
              <button className={classes.buy_btn}>Order Through App <ImMobile style={{ fontSize: "18px" }} />
              </button>
            </div>

          </div>
        </div>
      </Modal.Body>

    </Modal>
  )
}

export default ProductDetail