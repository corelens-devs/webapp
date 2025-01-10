import React from 'react'
import AiImage from "../../Assets/AiImage.png"
import AiImageEdited from "../../Assets/AiImage_edited.png";
import classes from "./Ai.module.css"
import Heading from '../Heading/Heading'
import { HiOutlinePlayCircle } from "react-icons/hi2";
import { TiVendorAndroid } from "react-icons/ti";
import { ImAppleinc } from "react-icons/im";
import { useNavigate } from 'react-router-dom';

const AISecurity = () => {
    const navigate = useNavigate()
    const downloadApk = () => {
        // On click, navigate to call this number
        window.location.href = "/corelens.apk";
    };

    const downloadIos = () => {
        // On click, navigate to call this number
        window.location.href = "https://apps.apple.com/in/app/corelens/id6621260366";
    };

    return (
      <div id="Aihome" className={classes.ai_home}>
        <Heading cls={classes.mb} heading={"Want to secure your home and vehicles from theft?"} />
        <a
          target="_blank"
          className={classes.btn1}
          href="https://www.youtube.com/watch?v=fSQbZqnMMaQ"
          rel="noopener noreferrer"
        >
          <span>See Video</span>
          <HiOutlinePlayCircle />
        </a>
        <p className={classes.p}>Download corelens app now</p>
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
        {/* <img className={classes.img} src={AiImage} alt="Corelens CCTV Camera for Home Security" /> */}
        <img className={classes.img} src={AiImageEdited} alt="Corelens CCTV Camera for Home Security" />
      </div>
    );
}

export default AISecurity