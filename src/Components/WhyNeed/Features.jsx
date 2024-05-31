// import React, { useEffect } from 'react'
// import Heading from '../Heading/Heading'
// import Security1 from "../../Assets/Security1.png"
// import Security2 from "../../Assets/Security2.png"
// import Security3 from "../../Assets/Security3.png"
// import Security4 from "../../Assets/Security4.png"
// import Security5 from "../../Assets/Security5.png"
// import Security6 from "../../Assets/Security6.png"
// import im1 from "../../Assets/im1.png"
// import im2 from "../../Assets/im2.png"
// import im3 from "../../Assets/im3.png"
// import im4 from "../../Assets/im4.png"
// import im5 from "../../Assets/im5.png"
// import im6 from "../../Assets/im6.png"
// import im7 from "../../Assets/im7.png"
// import im8 from "../../Assets/im8.png"
// import im9 from "../../Assets/im9.png"
// import im10 from "../../Assets/im10.png"
// import classes from "./Features.module.css"
// import BottomSection from './BottomSection'
// import BtmSlider from './BtmSlider'
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import Aos from 'aos'
// import BtmSlider2 from './BtmSlider2'

// const Features = () => {
// //   useEffect(() => {
// //     AOS.init({
// //         duration: 1000,
// //         once: false, // Ensure the animation triggers every time you scroll
// //     });

// //     // Reinitialize AOS when component updates, if necessary
// //     AOS.refresh();
// // }, []);
// useEffect(() => {
//   AOS.init({
//       duration: 1000, // Animation duration
//       offset: 200, // Offset (in pixels) from the bottom of the screen
//   });

//   const handleScroll = () => {
//       if (window.scrollY < 200) {
//           AOS.refresh(); // Refresh AOS when scrolling up to the top (adjust the offset as needed)
//       }
//   };

//   window.addEventListener('scroll', handleScroll);

//   return () => {
//       window.removeEventListener('scroll', handleScroll);
//   };
// }, []);
//   return (
//     <div className={classes.feat_top}>
//       <Heading heading="Why You need Corelens" cls={classes.div_head} />
//       <div className={classes.main_div}>
//         <div className={classes.d1}>
//           <div className={classes.d2}>
//             <img src={Security1} />
//             <div>
//               <h1>
//                 Increasing theft
//               </h1>
//               <p>
//                 With theft rates rising in india , securing your home and valuables is essential.We always leave our home in fear of theft and wish someone to protect it, but now no more. Don't wait—protect your assets now. Easy to install and very affordable.
//               </p>
//             </div>
//           </div>
//           <div className={classes.d2}>
//             <img src={Security4} />
//             <div >
//               <h1>Total security solution</h1>
//               <p>Experience complete peace of mind with our comprehensive security solution. Our camera sensors safeguard your home while our GPS trackers protect your vehicles. Say goodbye to worries about theft – our advanced technology ensures your property is always secure, giving you unmatched peace of mind.
//               </p>
//             </div>
//           </div>

//         </div>
//         <div className={classes.d1}>
//           <div className={classes.d2}>
//             <img src={Security2} />
//             <div>
//               <h1>
//                 On demand surveillance
//               </h1>
//               <p>
//                 Meet India's first app that combines monitoring with sensors. Our Camera Sensors keep your home safe. Plus, you can hire us to watch over your place through the app for just 150 rupees per hour per device. We'll keep an eye on your sensors when you can't, like when you're traveling or at the movies. If there's an emergency, we'll alert the police and neighbors.
//               </p>
//             </div>
//           </div>
//           <div className={classes.d2}>
//             <img src={Security5} />
//             <div >
//               <h1>Latest features</h1>
//               <p>Our camera sensors represent cutting-edge technology that hasn't hit the market yet, promising to elevate your home security to new heights. Meanwhile, our GPS trackers boast the latest lithium batteries, ensuring extended backup power of up to three months.</p>

//             </div>
//           </div>

//         </div>
//         <div className={classes.d1}>
//           <div className={classes.d2}>
//             <img src={Security3} />
//             <div>
//               <h1>Money saving prices</h1>
//               <p>In a market saturated with low-quality products, our primary focus is on providing you with peace of mind after every purchase. That's why we never compromise on the quality of components in our products, yet we manage to offer exceptional value without cutting corners. Rest assured, all our products deliver outstanding value for your money.</p>
//             </div>
//           </div>
//           <div className={classes.d2}>
//             <img src={Security6} />
//             <div >
//               <h1>After Sales Support</h1>
//               <p>Enjoy FREE home service for 1 year for unlimited times.NO conditions or restrictions. If our sensors detect any issues, we fix and deliver within 72 hours at your doorstep, and it's all free of charge.</p>
//             </div>
//           </div>

//         </div>

//       </div>


//       <Heading heading="Features of our camera sensors" cls={classes.div_head} />

//       <div className={classes.feat}>
//         <img src={im1} data-aos="fade-right" data-aos-delay="100" />
//         <img src={im2} data-aos="fade-right" data-aos-delay="200" />
//         <img src={im3} data-aos="fade-right" data-aos-delay="300" />
//         <img src={im4} data-aos="fade-right" data-aos-delay="400" />
//         <img src={im5} data-aos="fade-right" data-aos-delay="500" />
//       </div>

//       <div className={`${classes.mob} w-100`}>
//         <BtmSlider />
//       </div>

//       <Heading heading="Features of our Gps Trackers" cls={classes.div_head} />

//       <div className={classes.feat}>
//         <img src={im6} data-aos="fade-left" data-aos-delay="100" />
//         <img src={im7} data-aos="fade-left" data-aos-delay="200" />
//         <img src={im8} data-aos="fade-left" data-aos-delay="300" />
//         <img src={im9} data-aos="fade-left" data-aos-delay="400" />
//         <img src={im10} data-aos="fade-left" data-aos-delay="500" />
//       </div>

//       <div className={`${classes.mob} w-100`}>
//         <BtmSlider2 />
//       </div>
//       <BottomSection />
//     </div>
//   )
// }

// export default Features

import React, { useEffect } from 'react';
import Heading from '../Heading/Heading';
import Security1 from "../../Assets/Security1.png";
import Security2 from "../../Assets/Security2.png";
import average from "../../Assets/average.png";
import Security4 from "../../Assets/Security4.png";
import Security5 from "../../Assets/Security5.png";
import Security6 from "../../Assets/Security6.png";
import im1 from "../../Assets/im1.png";
import im2 from "../../Assets/im2.png";
import im3 from "../../Assets/im3.png";
import im4 from "../../Assets/im4.png";
import im5 from "../../Assets/im5.png";
import im6 from "../../Assets/im6.png";
import im7 from "../../Assets/im7.png";
import im8 from "../../Assets/im8.png";
import im9 from "../../Assets/im9.png";
import im10 from "../../Assets/im10.png";
import classes from "./Features.module.css";
import BottomSection from './BottomSection';
import BtmSlider from './BtmSlider';
import AOS from 'aos';
import 'aos/dist/aos.css';
import BtmSlider2 from './BtmSlider2';

const Features = () => {
   

    useEffect(() => {
      AOS.init({
          duration: 1000,
          once: false, 
      });
  
      AOS.refresh();
  }, []);

    return (
        <div className={classes.feat_top}>
            <Heading heading="Why You need Corelens" cls={classes.div_head} />
            <div className={classes.main_div}>
                <div className={classes.d1}>
                    <div className={classes.d2}>
                        <img src={Security1} />
                        <div>
                            <h1>Increasing theft</h1>
                            <p>
                                With theft rates rising in India, securing your home and valuables is essential. We always leave our home in fear of theft and wish someone to protect it, but now no more. Don't wait—protect your assets now. Easy to install and very affordable.
                            </p>
                        </div>
                    </div>
                    <div className={classes.d2}>
                        <img src={Security4} />
                        <div>
                            <h1>Total security solution</h1>
                            <p>
                                Experience complete peace of mind with our comprehensive security solution. Our camera sensors safeguard your home while our GPS trackers protect your vehicles. Say goodbye to worries about theft – our advanced technology ensures your property is always secure, giving you unmatched peace of mind.
                            </p>
                        </div>
                    </div>
                </div>
                <div className={classes.d1}>
                    <div className={classes.d2}>
                        <img src={Security2} />
                        <div>
                            <h1>On demand surveillance</h1>
                            <p>
                                Meet India's first app that combines monitoring with sensors. Our Camera Sensors keep your home safe. Plus, you can hire us to watch over your place through the app for just 150 rupees per hour per device. We'll keep an eye on your sensors when you can't, like when you're traveling or at the movies. If there's an emergency, we'll alert the police and neighbors.
                            </p>
                        </div>
                    </div>
                    <div className={classes.d2}>
                        <img src={Security5} />
                        <div>
                            <h1>Latest features</h1>
                            <p>
                                Our camera sensors represent cutting-edge technology that hasn't hit the market yet, promising to elevate your home security to new heights. Meanwhile, our GPS trackers boast the latest lithium batteries, ensuring extended backup power of up to three months.
                            </p>
                        </div>
                    </div>
                </div>
                <div className={classes.d1}>
                    <div className={classes.d2}>
                        <img src={average} />
                        <div>
                            <h1>Money saving prices</h1>
                            <p>
                                In a market saturated with low-quality products, our primary focus is on providing you with peace of mind after every purchase. That's why we never compromise on the quality of components in our products, yet we manage to offer exceptional value without cutting corners. Rest assured, all our products deliver outstanding value for your money.
                            </p>
                        </div>
                    </div>
                    <div className={classes.d2}>
                        <img src={Security6} />
                        <div>
                            <h1>After Sales Support</h1>
                            <p>
                                Enjoy FREE home service for 1 year for unlimited times. NO conditions or restrictions. If our sensors detect any issues, we fix and deliver within 72 hours at your doorstep, and it's all free of charge.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Heading heading="Features of our camera sensors" cls={classes.div_head} />

            <div className={classes.feat}>
                <img src={im1} data-aos="fade-right" data-aos-delay="100" />
                <img src={im2} data-aos="fade-right" data-aos-delay="200" />
                <img src={im3} data-aos="fade-right" data-aos-delay="300" />
                <img src={im4} data-aos="fade-right" data-aos-delay="400" />
                <img src={im5} data-aos="fade-right" data-aos-delay="500" />
            </div>

            <div className={`${classes.mob} w-100`}>
                <BtmSlider />
            </div>

            <Heading heading="Features of our GPS Trackers" cls={classes.div_head} />

            <div className={classes.feat}>
                <img src={im6} data-aos="fade-left" data-aos-delay="100" />
                <img src={im7} data-aos="fade-left" data-aos-delay="200" />
                <img src={im8} data-aos="fade-left" data-aos-delay="300" />
                <img src={im9} data-aos="fade-left" data-aos-delay="400" />
                <img src={im10} data-aos="fade-left" data-aos-delay="500" />
            </div>

            <div className={`${classes.mob} w-100`}>
                <BtmSlider2 />
            </div>

            <BottomSection />
        </div>
    );
};

export default Features;
