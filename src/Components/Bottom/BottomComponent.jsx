
import React from 'react'
import { FaCircle, FaRegCircle } from 'react-icons/fa'
import Bottom_img from "../../Assets/Bottom_img.png"
import Bottom_img_edited from "../../Assets/Bottom_img_edited.png";
import phoneResponsive from "../../Assets/phoneResponsive.png"
import classes from "./BottomComp.module.css"
import { ImAppleinc } from 'react-icons/im'
import { TiVendorAndroid } from 'react-icons/ti'

const BottomComponent = () => {

  const downloadApk = () => {
    // On click, navigate to call this number
    window.location.href = "/corelens.apk";
  };

  const downloadIos = () => {
    // On click, navigate to call this number
    window.location.href = "https://apps.apple.com/in/app/corelens/id6621260366";
  };

  return (
    <div id="btm-section" className={classes.main_div}>
      {/* <img src={Bottom_img} />
      <img src={Bottom_img} className={classes.mob_res} /> */}

      <img src={Bottom_img_edited} />
      <img src={Bottom_img_edited} className={classes.mob_res} />
      <div>
        <h1>Your Gateway to 24/7 Security with Our Security App</h1>
        <p>Experience ultimate in home comfort, convenience, and control with our smart home solutions.</p>
        {/* <div className={classes.btm_btn_div}>
                <button className={classes.btm_btn}><FaCircle /><span><span> Download on the </span>App Store</span></button>
                <button  className={classes.btm_btn}> <FaCircle /><span><span>Get It On </span>Google Play</span></button>
            </div> */}
        <div className={classes.btm_btn_div}>
          <button className={classes.btm_btn} onClick={downloadIos}>
            <ImAppleinc style={{ fontSize: "30px" }} />
            <span>
              <span>Download on the</span>App Store
            </span>
          </button>
          <button className={classes.btm_btn} onClick={downloadApk}>
            {" "}
            <TiVendorAndroid style={{ fontSize: "40px" }} />
            <span>
              <span>Get It On </span>Google Play
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default BottomComponent