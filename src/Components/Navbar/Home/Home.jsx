import React from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import Banner from "../../../Assets/Banner.png"
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { Pagination } from 'swiper/modules';
import 'swiper/css/pagination';
import './Home.css'

const Home = () => {
    return (
          
                <Swiper
                pagination={true} 
                    loop={true}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: true,
                    }}
                    className={'home_slider'}
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
                            slidesPerView: 1.5
                        }
                    }}


                    spaceBetween={30}
                    slidesPerView={1.5}
                    modules={[ Autoplay, Pagination]}
                >
                  <SwiperSlide><img className='img'   src={Banner}/></SwiperSlide>
                  <SwiperSlide><img  className='img'  src={Banner}/></SwiperSlide>
                  <SwiperSlide><img className='img'   src={Banner}/></SwiperSlide>
                  
                </Swiper>
              
    );
}

export default Home