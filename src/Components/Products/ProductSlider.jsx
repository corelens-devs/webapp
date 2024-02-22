import React from 'react'
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
const ProductSlider = () => {
    return (
        <div style={{padding:"0 90px"}} id='product'>
        <Heading heading="Our Products"/>
        <Swiper
        pagination={{
            type: 'progressbar',
          }}
          navigation={true}
          modules={[Autoplay,  Pagination, Navigation]}
            loop={true}
            autoplay={{
                delay: 1000,
                disableOnInteraction: true,
            }}
            className={'home_slider home_slider1'}
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
            // slidesPerView={4}
        >
            <SwiperSlide><Product/></SwiperSlide>
            <SwiperSlide><Product cls={classes.p2}/></SwiperSlide>
            <SwiperSlide><Product cls={classes.p4}/></SwiperSlide>
            <SwiperSlide><Product cls={classes.p3}/></SwiperSlide>
            <SwiperSlide><Product cls={classes.p4}/></SwiperSlide>
            <SwiperSlide><Product cls={classes.p1}/></SwiperSlide>

        </Swiper>
        <button className={classes.view}>View All</button>
</div>
    );
}

export default ProductSlider