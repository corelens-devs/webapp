import React from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import classes from "./Features.module.css"
import im6 from "../../Assets/im6.png"
import im7 from "../../Assets/im7.png"
import im8 from "../../Assets/im8.png"
import im9 from "../../Assets/im9.png"
import im10 from "../../Assets/im10.png"
import "./whyneed.css"

const BtmSlider2 = () => {
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
            <SwiperSlide> <img className={classes.imge} src={im6} alt='Corelens CCTV Camera for Home Security' /></SwiperSlide>
            <SwiperSlide> <img className={classes.imge} src={im7} alt='Corelens CCTV Camera for Home Security' /></SwiperSlide>
            <SwiperSlide> <img className={classes.imge} src={im8} alt='Corelens CCTV Camera for Home Security' /></SwiperSlide>
            <SwiperSlide> <img className={classes.imge} src={im9} alt='Corelens CCTV Camera for Home Security' /></SwiperSlide>
            <SwiperSlide> <img className={classes.imge} src={im10} alt='Corelens CCTV Camera for Home Security' /></SwiperSlide>
             
            
        </Swiper>
        {/* <button className={classes.view}>View All</button> */}
</div>
    );
}

export default BtmSlider2