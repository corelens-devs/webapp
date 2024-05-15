import React from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import Banner1 from "../../../Assets/Banner1.png"
import Banner2 from "../../../Assets/Banner2.png"
import Banner3 from "../../../Assets/Banner3.png"
import Banner4 from "../../../Assets/Banner4.png"
import Banner5 from "../../../Assets/Banner5.png"
import Banner6 from "../../../Assets/Banner6.png"
import Banner7 from "../../../Assets/Banner7.png"
import Banner_mob from "../../../Assets/Banner_mob.png"
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { Pagination } from 'swiper/modules';
import 'swiper/css/pagination';
import './Home.css'

const Home = () => {
    return (

        <Swiper
            // pagination={true} 
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
            className={'home_slider hs1'}
            // slidesPerView={1}  
            breakpoints={{
                200: {
                    slidesPerView: 1
                },
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
                    slidesPerView: 1.5
                }
            }}


            spaceBetween={30}
            slidesPerView={1.5}
            modules={[Autoplay, Pagination]}
        >
            <SwiperSlide><img className='img' src={Banner1} /><img className='img_mob' src={Banner_mob} /></SwiperSlide>
            <SwiperSlide><img className='img' src={Banner2} /><img className='img_mob' src={Banner_mob} /></SwiperSlide>
            <SwiperSlide><img className='img' src={Banner3} /><img className='img_mob' src={Banner_mob} /></SwiperSlide>
            <SwiperSlide><img className='img' src={Banner4} /><img className='img_mob' src={Banner_mob} /></SwiperSlide>
            <SwiperSlide><img className='img' src={Banner5} /><img className='img_mob' src={Banner_mob} /></SwiperSlide>
            <SwiperSlide><img className='img' src={Banner6} /><img className='img_mob' src={Banner_mob} /></SwiperSlide>
            <SwiperSlide><img className='img' src={Banner7} /><img className='img_mob' src={Banner_mob} /></SwiperSlide>

        </Swiper>

    );
}

export default Home