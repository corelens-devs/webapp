import React from 'react'
import ServiceComp from './ServiceComp'
import service1 from "../../Assets/service1.png"
import gps from "../../Assets/gps.png"
import service3 from "../../Assets/service3.png"
import Heading from '../Heading/Heading'
import classes from "./Service.module.css"

const Services = () => {
  return (
      <div id="services">
      <Heading heading={"What We Offer"} para="" cls={classes.div_head} />
    <div className={classes.service_div}>
        <ServiceComp para={"Forget old CCTV CAMERAS and switch to our latest CAMERA-sensors which have alarms,mobile alerts,human detection alert to help stop theft when you're away from home. You can even book surveillance to watch your place while you're out at just 150rs per hour."} heading={"Camera sensors with on demand surveillance"} img={service1}/>
        <ServiceComp para={"Introducing our sleek, lightweight and high-magnetic GPS trackers which you can hide anywhere in your CARS AND BIKES . We offer pinpoint-accurate GPS trackers with unbeatable battery life, geofencing, real-time alerts, apple and google maps support and much more.Easy to install, they’re a must-have for protecting your vehicles."} heading={"Gps trackers"} img={gps} cls={classes.p2}/>
        <ServiceComp heading={"24/7 support and Free home-service"} para={"Enjoy 1 year of free home service with our products. Plus, we offer free delivery across India, 24/7 toll-free support, easy returns and replacements. We provide a dedicated complaint manager  until your issue is resolved. Your issues are our priority and we stay with you until they are fixed .We don’t ignore your problems and we’ll keep assisting you until your issue is resolved completely."} img={service3} cls={classes.p3}/>
 
    </div>
    </div>
  )
}

export default Services