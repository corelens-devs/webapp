import React from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css/pagination';
import './nav.css'

const BottomNavSlider = () => {
    return (
      <div className='mobile_section'>
          <Swiper
            // pagination={true} 
            // loop={true}
            // centeredSlides={true}
          
            // pagination={{
            //     clickable: true,
            // }}
            // autoplay={{
            //     delay: 1000,
            //     disableOnInteraction: true,
            // }}
            // dir="rtl"
            className={'hs2'}
            // slidesPerView={1}
            breakpoints={{
                200: {
                    slidesPerView: 2
                },
                360: {
                    slidesPerView: 2.5
                },
                390: {
                    slidesPerView: 3
                },
                430: {
                    slidesPerView: 3
                },
                500: {
                    slidesPerView: 3
                },

                690: {
                    slidesPerView: 4
                },
                800: {
                    slidesPerView: 5
                },
               
            }}


            spaceBetween={5}
            slidesPerView={3}
        >
            <SwiperSlide>   <div>
            <a href="#Aihome" className='mobile_section_a'>A.I Home Security</a>
            </div>
</SwiperSlide>
            <SwiperSlide>   <div> <a href="#services" className={'mobile_section_a'}>What we Offer</a></div>
</SwiperSlide>
            <SwiperSlide >  <div>
            <a href="#product" className={'mobile_section_a'}>Our Products</a>
            </div>
</SwiperSlide>
            <SwiperSlide>    <div>
            <a href="#mobile-section" className={'mobile_section_a'}>Process</a>
            </div>

</SwiperSlide>
            <SwiperSlide>  <div>
            <a href="#btm-section" className={'mobile_section_a'}>Download app</a>
            </div>
</SwiperSlide>

        </Swiper>
      </div>

    );
}

export default BottomNavSlider