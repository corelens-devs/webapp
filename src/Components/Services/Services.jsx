import React from 'react'
import ServiceComp from './ServiceComp'
import service1 from "../../Assets/service1.png"
import service2 from "../../Assets/service2.png"
import service3 from "../../Assets/service3.png"
import Heading from '../Heading/Heading'
import classes from "./Service.module.css"

const Services = () => {
  return (
      <div id="services">
      <Heading heading={"What We Offer"} para="" />
    <div className={classes.service_div}>
        <ServiceComp para={"We provide AI-advanced security devices to protect your home and your vehicles from theft which you can monitor yourself on mobile phones. "} heading={"Camera sensors"} img={service1}/>
        <ServiceComp para={"If you are busy, We can watch your camera sensors for you at 150Rs per hour, and you only pay for the time we do monitoring, no monthly fees. Download app to know more."} heading={"Serveillance"} img={service2}/>
        <ServiceComp heading={"Support"} para={"Enjoy complementary HOME SERVICE for 2 years (rare now a days),free delivery pan india,72hour replacement policy , 24/7 toll-free call support and much more."} img={service3}/>
 
    </div>
    </div>
  )
}

export default Services