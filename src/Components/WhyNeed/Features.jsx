import React from 'react'
import Heading from '../Heading/Heading'
import Security1 from "../../Assets/Security1.png"
import Security2 from "../../Assets/Security2.png"
import Security3 from "../../Assets/Security3.png"
import Security4 from "../../Assets/Security4.png"
import Security5 from "../../Assets/Security5.png"
import Security6 from "../../Assets/Security6.png"
import Frame1 from "../../Assets/Frame1.png"
import Frame2 from "../../Assets/Frame2.png"
import Frame3 from "../../Assets/Frame3.png"
import Frame4 from "../../Assets/Frame4.png"
import Frame5 from "../../Assets/Frame5.png"
import classes from "./Features.module.css"
import BottomSection from './BottomSection'

const Features = () => {
  return (
    <div>
        <Heading heading="Why You need Corelens"/>
        <div className={classes.main_div}>
            <ul>
                <li>
                    <img src={Security1}/>
                   <div>
                   <h1>
                    Theft-proof home and offices
                    </h1>
                    <p>
                    Secure your property at bare minimum prices. Leave your home worry-free knowing it’s secured. 
                    </p>
                   </div>
                </li>
                <li>
                <img src={Security2}/>
                  <div>
                  <h1>On demand surveillance </h1>
                    <p>Presenting the FIRST app that combines Monitoring/Surveillance. Pay for utilized hours, that can b easily booked when leaving home.</p>
                  </div>
                </li>
                <li>
                <img src={Security3}/>
                 <div>
                 <h1>AI -Features</h1>
                    <p>Over 20+ LATEST features in ONE device to COMPLETELY STOP theft and robbery. Download app to explore.</p>
                 </div>
                </li>
            </ul>
            <ul>
                <li>
                <img src={Security4}/>
                   <div>
                   <h1>
                    Peace of mind
                    </h1>
                    <p>
                    Enjoy family trips, movies, dinners, and more without worrying about home security. Our app solves everyday concerns like pet and maid surveillance, and caring for elderly parents. Explore for more details! 
                    </p>
                   </div>
                </li>
                <li>
                <img src={Security5}/>
                   <div>
                   <h1>Latest products with long-lasting life</h1>
                    <p>Our products are tested over Various Quality checks before we send them to your service. See full product list on our App.</p>
                   </div>
                </li>
                <li>
                <img src={Security6}/>
                  <div>
                  <h1>After Sales Support</h1>
                    <p>Enjoy FREE home service for two years for unlimited times.NO conditions or restrictions. If our sensors detect any issues, we fix and deliver within 72 hours at your doorstep, and it's all free of charge.</p>
                  </div>
                </li>
            </ul>
        </div>
        <div className={classes.feat}>
            <img src={Frame1}/>
            <img src={Frame2}/>
            <img src={Frame3}/>
            <img src={Frame4}/>
            <img src={Frame5}/>
        </div>
        <BottomSection/>
    </div>
  )
}

export default Features