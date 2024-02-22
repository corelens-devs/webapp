import React from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import classes from "./ProductDetail.module.css"
import ProductDetail from './ProductDetail';
import Heading from "../../Heading/Heading"
import ProDetail from './ProDetail';
import "../product.css"

const DetailSlider = () => {
    return (
        <div className={classes.prod}>
       
        <Swiper
       loop={true}
       centeredSlides={true}
       pagination={{
           clickable: true,
       }}
       autoplay={{
           delay: 1000,
           disableOnInteraction: true,
       }}
       // dir="rtl"
       className={'home_slider home_slider2'}
       // slidesPerView={1}
       breakpoints={{
           360: {
               slidesPerView: 1
           },
           690: {
               slidesPerView: 1
           },
           1000: {
               slidesPerView: 1
           },
           1200: {
               slidesPerView: 1
           }
       }}


       spaceBetween={30}
       slidesPerView={1.5}
       modules={[Autoplay, Pagination]}
        >
            <SwiperSlide><ProDetail/></SwiperSlide>
            <SwiperSlide><ProDetail /></SwiperSlide>
            <SwiperSlide><ProDetail /></SwiperSlide>
            <SwiperSlide><ProDetail /></SwiperSlide>
            <SwiperSlide><ProDetail /></SwiperSlide>
            <SwiperSlide><ProDetail/></SwiperSlide>

        </Swiper>
       
</div>
    );
}

export default DetailSlider