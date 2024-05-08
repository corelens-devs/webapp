import React, { useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Product from './Product';
import Heading from '../Heading/Heading';
import classes from "./Product.module.css"
import product1 from "../../Assets/product1.jpeg"
import product2 from "../../Assets/product2.jpeg"
import product3 from "../../Assets/product3.png"
import product4 from "../../Assets/product4.png"
import product5 from "../../Assets/product5.PNG"
import product7 from "../../Assets/product7.PNG"
import product9 from "../../Assets/product9.JPG"
import product8 from "../../Assets/product8.JPG"
import product6 from "../../Assets/product6.JPG"

const ProductSlider = () => {
    const gradients = {
        p1: 'linear-gradient(180deg, #FCB48C 0%, #FFEADF 100%)',
        p2: 'linear-gradient(180deg, #6FDBF9 0%, rgba(207, 245, 255, 0.69) 100%)',
        p3: 'linear-gradient(180deg, #E8EB8C 0%, #FEFFEE 100%)',
        p4: 'linear-gradient(180deg, #FF9CA9 0%, rgba(255, 181, 191, 0.48) 100%)',
      };

      const [showAllProducts, setShowAllProducts] = useState(false);

      const toggleProductsView = () => {
        setShowAllProducts(!showAllProducts);
    };

      const products = [
        { id: 1, name: 'Corelens Turbo', actualAmount: '3499', discount : "40", img:product1, cls: classes.p1, gradientColors: gradients.p1, 
            mainhighlight : [
                {
                    title : "Real-time Tracking", img:""
                },
                {
                    title : "2G network communication", img:""
                },
                {
                    title : "Track Playback", img:""
                },
                {
                    title : "ACC", img:""
                },
                {
                    title : "Power-off alarm", img:""
                },
                {
                    title : "Fence alarm", img:""
                },
                {
                    title : "Over-speed alarm", img:""
                },
            ]
            , technicalHightlight : []
        },
        { id: 2, name: 'Corelens moto',  actualAmount: '7499', discount : "40",img:product2, cls: classes.p1, gradientColors: gradients.p1, 
            mainhighlight : [
                {
                    title : "Real-time Tracking", img:""
                },
                {
                    title : "2G network communication", img:""
                },
                {
                    title : "Track Playback", img:""
                },
                {
                    title : "ACC", img:""
                },
                {
                    title : "Power-off alarm", img:""
                },
                {
                    title : "Fence alarm", img:""
                },
                {
                    title : "Over-speed alarm", img:""
                },
            ]
            , technicalHightlight : []
        },
        { id: 3, name: 'Corelens router - mercusys mr30G', actualAmount: '2418', discount : "10", img:product3, cls: classes.p1, gradientColors: gradients.p1, 
            mainhighlight : [
                {
                    title : "4 External Antennas", img:""
                },
                {
                    title : "Enhanced Signal", img:""
                },
                {
                    title : "2 x 2 MIMO", img:""
                },
                {
                    title : "Ease of Use", img:""
                },
                {
                    title : "Guest Network", img:""
                },
                {
                    title : "Parental Controls", img:""
                }
            ]
            , technicalHightlight : [
                {title: "Wireless WAN", description:"Working as client to connect to ISP hot points or uplink AP wirelessly to share the Internet"},
                {title: "Easy Setup", description:"Quick to set up and get it run just in minutes using any smartphone, pad or computer."},
                {title: "Advanced Security", description:"WPA2 wireless encryption helps you keep your wireless network protected."}
            ]
        },
        { id: 4, name: 'Corelens router - ac12', actualAmount: '2088', discount : "10", img:product4, cls: classes.p1, gradientColors: gradients.p1, 
        mainhighlight : [
            {
                title : "4 External Antennas", img:""
            },
            {
                title : "Enhanced Signal", img:""
            },
            {
                title : "2 x 2 MIMO", img:""
            },
            {
                title : "Ease of Use", img:""
            },
            {
                title : "Guest Network", img:""
            },
            {
                title : "Parental Controls", img:""
            }
        ]
            , technicalHightlight : [
                {title: "Wireless WAN", description:"Working as client to connect to ISP hot points or uplink AP wirelessly to share the Internet"},
                {title: "Easy Setup", description:"Quick to set up and get it run just in minutes using any smartphone, pad or computer."},
                {title: "Advanced Security", description:"WPA2 wireless encryption helps you keep your wireless network protected."}]
        },
        { id: 5, name: 'Corelens polo',  actualAmount: '2499', discount : "50", img:product5, cls: classes.p1, gradientColors: gradients.p1, 
            mainhighlight : [
                {
                    title : "Real 4mb", img:""
                },
                {
                    title : "Ip67 water resistant", img:""
                },
                {
                    title : "1 yr home service", img:""
                },
                {
                    title : "Inbuilty memory", img:""
                },
                {
                    title : "Motion follow", img:""
                },
                {
                    title : "2 way audio", img:""
                },
                {
                    title : "IR night vision", img:""
                },
                {
                    title : "Smart alarm", img:""
                },
            ]
            , technicalHightlight : []
        },
        { id: 6, name: 'Corelens oval',  actualAmount: '6999', discount : "50", img:product6, cls: classes.p1, gradientColors: gradients.p1, 
        mainhighlight : [
            {
                title : "Real 8mb", img:""
            },
            {
                title : "Ip67 water resistant", img:""
            },
            {
                title : "1 yr home service", img:""
            },
            {
                title : "Inbuilty memory", img:""
            },
            {
                title : "Motion follow", img:""
            },
            {
                title : "2 way audio", img:""
            },
            {
                title : "IR night vision", img:""
            },
            {
                title : "Smart alarm", img:""
            },
        ]
            , technicalHightlight : []
        },
        { id: 7, name: 'Corelens gem',  actualAmount: '6199', discount : "50", img:product7, cls: classes.p1, gradientColors: gradients.p1, 
        mainhighlight : [
            {
                title : "Real 4mb", img:""
            },
            {
                title : "Ip67 water resistant", img:""
            },
            {
                title : "1 yr home service", img:""
            },
            {
                title : "Inbuilty memory", img:""
            },
            {
                title : "Motion follow", img:""
            },
            {
                title : "2 way audio", img:""
            },
            {
                title : "IR night vision", img:""
            },
            {
                title : "Smart alarm", img:""
            },
        ]
            , technicalHightlight : []
        },
        { id: 8, name: 'Corelens echo', actualAmount: '3999', discount : "50", img:product8, cls: classes.p1, gradientColors: gradients.p1, 
        mainhighlight : [
            {
                title : "Real 2mb", img:""
            },
            {
                title : "alexa and google assistant support", img:""
            },
            {
                title : "1 yr home service", img:""
            },
            {
                title : "Inbuilty memory", img:""
            },
            {
                title : "Motion follow", img:""
            },
            {
                title : "2 way audio", img:""
            },
            {
                title : "IR night vision", img:""
            },
            {
                title : "Smart alarm", img:""
            },
        ]
            , technicalHightlight : []
        },
        { id: 9, name: 'Corelens Turbo', actualAmount: '3999', discount : "50",img:product9, cls: classes.p1, gradientColors: gradients.p1, 
        mainhighlight : [
            {
                title : "Real 2mb", img:""
            },
            {
                title : "alexa and google assistant support", img:""
            },
            {
                title : "1 yr home service", img:""
            },
            {
                title : "Inbuilty memory", img:""
            },
            {
                title : "Motion follow", img:""
            },
            {
                title : "2 way audio", img:""
            },
            {
                title : "IR night vision", img:""
            },
            {
                title : "Smart alarm", img:""
            },
        ]
            , technicalHightlight : []
        },
        // { id: 2, name: 'Product 2', cls: classes.p2, gradientColors: gradients.p2 },
        // { id: 3, name: 'Product 3', cls: classes.p3, gradientColors: gradients.p3 },
        // { id: 4, name: 'Product 4', cls: classes.p4, gradientColors: gradients.p4 },
        // { id: 5, name: 'Product 1', cls: classes.p1, gradientColors: gradients.p1 },
        // { id: 6, name: 'Product 2', cls: classes.p2, gradientColors: gradients.p2 },
        // { id: 7, name: 'Product 3', cls: classes.p3, gradientColors: gradients.p3 },
        // { id: 8, name: 'Product 4', cls: classes.p4, gradientColors: gradients.p4 },
        // { id: 9, name: 'Product 4', cls: classes.p1, gradientColors: gradients.p1 },
        // { id: 10, name: 'Product 4', cls: classes.p2, gradientColors: gradients.p2 },
        // Add more products as needed
    ];

    
    return (
        <div  id='product'>
        <Heading heading="Our Products" cls={classes.div_head}/>
        <Swiper
        pagination={{
            type: 'progressbar',
          }}
          navigation={true}
          modules={[ Autoplay, Pagination, Navigation]}
            loop={true}
            autoplay={{
                delay: 5000,
                disableOnInteraction: true,
            }}
            className={'home_slider home_slider1 prmodal'}
            slidesPerView={1}
            breakpoints={{
                360: {
                    slidesPerView: 1
                },
                690: {
                    slidesPerView: 2
                },
                1000: {
                    slidesPerView: 3
                },
                1200: {
                    slidesPerView: 4
                }
            }}


            spaceBetween={30}
        >


      {products.map((item, index) => (
        <SwiperSlide key={index}>
        <Product data={item} cls={classes[`p${(index % 4) + 1}`]} gradientColors={gradients[`p${(index % 4) + 1}`]} />
      </SwiperSlide>
      ))}
      
          

        </Swiper>
        {!showAllProducts &&
                    <button className={classes.view} onClick={toggleProductsView}>View More</button>
                }


        {showAllProducts && (
                <div  className={`${classes.allProducts} ${showAllProducts ? classes.showAllProducts : ''}`}>
                  
                    <div className={classes.productList}>
                        {products.map(product => (
                            <div key={product.id} className={classes.productItem}>
                                <Product cls={product.cls}
                                data={product} gradientColors={product.gradientColors} />
                                
                            </div>
                        ))}
                    </div>
                </div>
            )}
            
                  { showAllProducts && <button className={classes.view} onClick={toggleProductsView}>View Less</button> }

</div>
    );
}

export default ProductSlider



// import React from 'react'
// // Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay } from 'swiper/modules';
// import 'swiper/css';
// import { Pagination, Navigation } from 'swiper/modules';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
// import Product from './Product';
// import Heading from '../Heading/Heading';
// import classes from "./Product.module.css"
// const ProductSlider = () => {
//     const gradients = {
//         p1: 'linear-gradient(180deg, #FCB48C 0%, #FFEADF 100%)',
//         p2: 'linear-gradient(180deg, #6FDBF9 0%, rgba(207, 245, 255, 0.69) 100%)',
//         p3: 'linear-gradient(180deg, #E8EB8C 0%, #FEFFEE 100%)',
//         p4: 'linear-gradient(180deg, #FF9CA9 0%, rgba(255, 181, 191, 0.48) 100%)',
//       };
    
//     return (
//         <div  id='product'>
//         <Heading heading="Our Products" cls={classes.div_head}/>
//         <Swiper
//         pagination={{
//             type: 'progressbar',
//           }}
//           navigation={true}
//           modules={[ Autoplay, Pagination, Navigation]}
//             loop={true}
//             autoplay={{
//                 delay: 5000,
//                 disableOnInteraction: true,
//             }}
//             className={'home_slider home_slider1 prmodal'}
//             slidesPerView={1}
//             breakpoints={{
//                 360: {
//                     slidesPerView: 1
//                 },
//                 690: {
//                     slidesPerView: 2
//                 },
//                 1000: {
//                     slidesPerView: 3
//                 },
//                 1200: {
//                     slidesPerView: 4
//                 }
//             }}


//             spaceBetween={30}
//             // slidesPerView={4}
//         >


//       {[...Array(10)].map((_, index) => (
//         <SwiperSlide key={index}>
//           <Product cls={classes[`p${(index % 4) + 1}`]} gradientColors={gradients[`p${(index % 4) + 1}`]} />
//         </SwiperSlide>
//       ))}
//             {/* <SwiperSlide><Product cls={classes.p1}/></SwiperSlide>
//             <SwiperSlide><Product cls={classes.p2}/></SwiperSlide>
//             <SwiperSlide><Product cls={classes.p3}/></SwiperSlide>
//             <SwiperSlide><Product cls={classes.p4}/></SwiperSlide>
//             <SwiperSlide><Product cls={classes.p1}/></SwiperSlide>
//             <SwiperSlide><Product cls={classes.p2}/></SwiperSlide>
//             <SwiperSlide><Product cls={classes.p3}/></SwiperSlide>
//             <SwiperSlide><Product cls={classes.p4}/></SwiperSlide>
//             <SwiperSlide><Product cls={classes.p1}/></SwiperSlide>
//             <SwiperSlide><Product cls={classes.p2}/></SwiperSlide> */}
          

//         </Swiper>
//         <button className={classes.view}>View All</button>
// </div>
//     );
// }

// export default ProductSlider