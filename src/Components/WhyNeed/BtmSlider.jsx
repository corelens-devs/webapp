import React from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import classes from "./Features.module.css"
import im1 from "../../Assets/im1.png"
import im2 from "../../Assets/im2.png"
import im3 from "../../Assets/im3.png"
import im4 from "../../Assets/im4.png"
import im5 from "../../Assets/im5.png"
import "./whyneed.css"

const BtmSlider = () => {
    return (
        <div>
        {/* <Heading heading="Our Products"/> */}
        <Swiper
        pagination={{
            type: 'progressbar',
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
            loop={true}
            autoplay={{
                delay: 5000,
                disableOnInteraction: true,
            }}
            className={'home_slider home_slider1 whyneed1'}
            slidesPerView={1}
            breakpoints={{
                360: {
                    slidesPerView: 1
                },
               
                550: {
                    slidesPerView: 2
                },
               
                690: {
                    slidesPerView: 2
                },
                1000: {
                    slidesPerView: 3
                },
                1200: {
                    slidesPerView: 5
                }
            }}


            spaceBetween={30}
            // slidesPerView={4}
        >
            <SwiperSlide> <img className={classes.imge} src={im1}/></SwiperSlide>
            <SwiperSlide> <img className={classes.imge} src={im2}/></SwiperSlide>
            <SwiperSlide> <img className={classes.imge} src={im3}/></SwiperSlide>
            <SwiperSlide> <img className={classes.imge} src={im4}/></SwiperSlide>
            <SwiperSlide> <img className={classes.imge} src={im5}/></SwiperSlide>
             
            
        </Swiper>
        {/* <button className={classes.view}>View All</button> */}
</div>
    );
}

export default BtmSlider