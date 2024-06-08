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
        <ServiceComp para={"Forget old CCTV cameras and switch to our latest camera sensors. They come with alarms, mobile alerts, and human detection to help stop theft when you're away. You can even book surveillance for just 9 Rs per hour to watch your place while you're out."} heading={"Camera Sensors with On-Demand Surveillance"} img={service1}/>
        <ServiceComp para={"Our Slim ,lightweight and powerful magnetic GPS trackers can be hidden anywhere in your cars and bikes. They have long battery life, geofencing, real-time alerts, and support for Apple and Google Maps. Easy to install, they're essential for keeping your vehicles safe."} heading={"Gps Trackers"} img={gps} cls={classes.p2}/>

        <ServiceComp heading={"24/7 Support and Free Home Service"} para={"Get 1 year of free home service with our products. We offer free delivery across India, 24/7 toll-free support, easy returns, and replacements. We provide a dedicated manager to resolve your issues completely. Your problems are our priority, and we’ll keep assisting you until they're fixed."} img={service3} cls={classes.p3}/>
 
    </div>
    </div>
  )
}

export default Services