import React from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import classes from './ProductDetail.module.css'
import scan1 from "../../../Assets/scan1.png"
import scan2 from "../../../Assets/scan2.png"
import scan3 from "../../../Assets/scan3.png"
import scan4 from "../../../Assets/scan4.png"
import scan5 from "../../../Assets/scan5.png"
import '../product.css'


const MainHighlight = ({data}) => {
    console.log(data)
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
           
            className='home_slider home_slider1 slidemodal'
            slidesPerView={1}
            breakpoints={{
                360: {
                    slidesPerView: 3
                },
               
                550: {
                    slidesPerView: 3
                },
               
                690: {
                    slidesPerView: 3
                },
                1000: {
                    slidesPerView: 4
                },
                1200: {
                    slidesPerView: 4
                }
            }}


            spaceBetween={10}
            // slidesPerView={4}
        >
           {data?.map((item)=>(
             <SwiperSlide><div className={classes.main_div3}>
             <div>
             <img src={item?.img} alt="" className={classes.img1} />
             </div>
             <p>{item.title}</p>
           </div></SwiperSlide>
           ))}
            {/* <SwiperSlide><div className={classes.main_div3}>
                <img src={scan1} alt="" />
                <p>Sample test here</p>
              </div></SwiperSlide>
            <SwiperSlide><div className={classes.main_div3}>
                <img src={scan2} alt="" />
                <p>Sample test here</p>
              </div></SwiperSlide>
            <SwiperSlide>  <div className={classes.main_div3}>
                <img src={scan3} alt="" />
                <p>Sample test here</p>
              </div></SwiperSlide>
            <SwiperSlide> <div className={classes.main_div3}>
                <img src={scan4} alt="" />
                <p>Sample test here</p>
              </div></SwiperSlide>
            <SwiperSlide> <div className={classes.main_div3}>
                <img src={scan5} alt="" />
                <p>Sample test here</p>
              </div></SwiperSlide> */}
             
            
        </Swiper>
        {/* <button className={classes.view}>View All</button> */}
</div>
    );
}

export default MainHighlight



// [{
//   id :1 ,
//   value : ""
// }]