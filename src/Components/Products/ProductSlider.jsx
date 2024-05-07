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
        { id: 1, name: 'Product 1', cls: classes.p1, gradientColors: gradients.p1 },
        { id: 2, name: 'Product 2', cls: classes.p2, gradientColors: gradients.p2 },
        { id: 3, name: 'Product 3', cls: classes.p3, gradientColors: gradients.p3 },
        { id: 4, name: 'Product 4', cls: classes.p4, gradientColors: gradients.p4 },
        { id: 5, name: 'Product 1', cls: classes.p1, gradientColors: gradients.p1 },
        { id: 6, name: 'Product 2', cls: classes.p2, gradientColors: gradients.p2 },
        { id: 7, name: 'Product 3', cls: classes.p3, gradientColors: gradients.p3 },
        { id: 8, name: 'Product 4', cls: classes.p4, gradientColors: gradients.p4 },
        // Add more products as needed
    ];
    
    return (
        <div  id='product' className={`${classes.productContainer} ${showAllProducts ? classes.showAllProducts : ''}`}>
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


      {[...Array(10)].map((_, index) => (
        <SwiperSlide key={index}>
          <Product cls={classes[`p${(index % 4) + 1}`]} gradientColors={gradients[`p${(index % 4) + 1}`]} />
        </SwiperSlide>
      ))}
      
          

        </Swiper>
        {!showAllProducts &&
                    <button className={classes.view} onClick={toggleProductsView}>View More</button>
                }


        {showAllProducts && (
                <div className={classes.allProducts}>
                  
                    <div className={classes.productList}>
                        {products.map(product => (
                            <div key={product.id} className={classes.productItem}>
                                <Product cls={product.cls} gradientColors={product.gradientColors} />
                                
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