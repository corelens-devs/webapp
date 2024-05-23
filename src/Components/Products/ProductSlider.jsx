import React, { useEffect, useRef, useState } from 'react'
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
import product1 from "../../Assets/product1.png"
import product2 from "../../Assets/product2.png"
import product3 from "../../Assets/product3.png"
import product4 from "../../Assets/product4.png"
import product5 from "../../Assets/product5.PNG"
import product7 from "../../Assets/product7.PNG"
import product9 from "../../Assets/product9.png"
import product8 from "../../Assets/product8.png"
import product6 from "../../Assets/product6.png"
import icon1 from "../../Assets/icon1.png"
import icon2 from "../../Assets/icon2.png"
import icon3 from "../../Assets/icon3.png"
import icon4 from "../../Assets/icon4.png"
import icon5 from "../../Assets/icon5.png"
import icon6 from "../../Assets/icon6.png"
import icon7 from "../../Assets/icon7.png"
import icon8 from "../../Assets/icon8.png"
import icon9 from "../../Assets/icon9.png"
import icon10 from "../../Assets/icon10.png"
import icon11 from "../../Assets/icon11.png"
import icon12 from "../../Assets/icon12.png"
import icon13 from "../../Assets/icon13.png"
import icon14 from "../../Assets/icon14.png"
import icon15 from "../../Assets/icon15.png"
import icon16 from "../../Assets/icon16.png"
import icon17 from "../../Assets/icon17.png"
import icon18 from "../../Assets/icon18.png"
import icon19 from "../../Assets/icon19.png"
import ProductDetail from './ProductDetails/ProductDetail';
import AOS from 'aos'
import 'aos/dist/aos.css';


const ProductSlider = ({ searchTerm }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [showAllProducts, setShowAllProducts] = useState(false);

    // console.log(searchTerm)

    const gradients = {
        p1: 'linear-gradient(180deg, #FCB48C 0%, #FFEADF 100%)',
        p2: 'linear-gradient(180deg, #6FDBF9 0%, rgba(207, 245, 255, 0.69) 100%)',
        p3: 'linear-gradient(180deg, #E8EB8C 0%, #FEFFEE 100%)',
        p4: 'linear-gradient(180deg, #FF9CA9 0%, rgba(255, 181, 191, 0.48) 100%)',
    };

    const products = [
        {
            id: 1, name: 'Turbo', cat: "GPS Trackers", actualAmount: '4999', discount: "30%", saleAmount : "3499", img: product1, cls: classes.p1, gradientColors: gradients.p1,
            mainhighlight: [
                {
                    title: "Real-time Tracking", img: icon1
                },
                {
                    title: "4G network communication", img: icon2
                },
                {
                    title: "Track Playback", img: icon3
                },
                {
                    title: "ACC Alarm", img: icon4
                },
                {
                    title: "Power-off alarm", img: icon5
                },
                {
                    title: "Fence alarm", img: icon7
                },
                {
                    title: "Over-speed alarm", img: icon6
                },
            ]
            , technicalHightlight: [{
                title: "Operating voltage", description: "3.7V"
            },
            {
                title: "Position method", description: "GPS+BDS+LBS+WiFi"
            },
            {
                title: "Positioning error", description: "<10 M"
            },
            {
                title: "Communication network", description: "4G"
            },
            {
                title: "Weight", description: "317g"
            },
            {
                title: "Communication band", description: "Global version : LTE-FDD B1/B2/B3/B4/B5/B7/B8/B12/B13/B18/B19/B20/B25/B26/B28/B66 LTE-TDD : B34/B38/B39/B40/B41  GSM : 850/900/1800/1900 MHz"
            },
            ]
        },
        {
            id: 2, name: 'Moto', cat: "GPS Trackers", actualAmount: '1999', discount: "45%", saleAmount : "1099", img: product2, cls: classes.p2, gradientColors: gradients.p2,
            mainhighlight: [
                {
                    title: "Real-time Tracking", img: icon1
                },
                {
                    title: "4G network communication", img: icon2
                },
                {
                    title: "Track Playback", img: icon3
                },
                {
                    title: "ACC", img: icon4
                },
                {
                    title: "Power-off alarm", img: icon5
                },
                {
                    title: "Fence alarm", img: icon7
                },
                {
                    title: "Over-speed alarm", img: icon6
                },
            ]
            ,
            technicalHightlight: [
                {
                    title: "Operating voltage", description: "3.7V"
                },
                {
                    title: "Position method", description: "GPS+BDS+LBS+WiFi"
                },
                {
                    title: "Positioning error", description: "<10 M"
                },
                {
                    title: "Communication network", description: "4G"
                },
                {
                    title: "Weight", description: "317g"
                },
                {
                    title: "Communication band", description: "Global version : LTE-FDD B1/B2/B3/B4/B5/B7/B8/B12/B13/B18/B19/B20/B25/B26/B28/B66 LTE-TDD : B34/B38/B39/B40/B41  GSM : 850/900/1800/1900 MHz"
                },
            ]
        },
        {
            id: 3, name: 'Mercusys mr30G',cat: "Wifi Extender", actualAmount: '3299', discount: "33%",   saleAmount : "2199", img: product3, cls: classes.p3, gradientColors: gradients.p3,
            mainhighlight: [
                {
                    title: "4 External Antennas", img: icon2
                },
                {
                    title: "Enhanced Signal", img: icon16
                },
                {
                    title: "2 x 2 MIMO", img: icon18
                },
                {
                    title: "Ease of Use", img: icon15
                },
                {
                    title: "Guest Network", img: icon17
                },
                {
                    title: "Parental Controls", img: icon19
                }
            ]
            , technicalHightlight: [
                { title: "Wireless WAN", description: "Working as client to connect to ISP hot points or uplink AP wirelessly to share the Internet" },
                { title: "Easy Setup", description: "Quick to set up and get it run just in minutes using any smartphone, pad or computer." },
                { title: "Advanced Security", description: "WPA2 wireless encryption helps you keep your wireless network protected." }
            ]
        },
        {
            id: 4, name: 'Mercusys ac12',cat: "Wifi Extender", actualAmount: '2999', discount: "36%",  saleAmount : "1899", img: product4, cls: classes.p4, gradientColors: gradients.p4,
            mainhighlight: [
                {
                    title: "4 External Antennas", img: icon2
                },
                {
                    title: "Enhanced Signal", img: icon16
                },
                {
                    title: "2 x 2 MIMO", img: icon18
                },
                {
                    title: "Ease of Use", img: icon15
                },
                {
                    title: "Guest Network", img: icon17
                },
                {
                    title: "Parental Controls", img: icon19
                }
            ]
            , technicalHightlight: [
                { title: "Wireless WAN", description: "Working as client to connect to ISP hot points or uplink AP wirelessly to share the Internet" },
                { title: "Easy Setup", description: "Quick to set up and get it run just in minutes using any smartphone, pad or computer." },
                { title: "Advanced Security", description: "WPA2 wireless encryption helps you keep your wireless network protected." }]
        },
        {
            id: 5, name: 'Polo',cat: "Outdoor Camera Sensor", actualAmount: '4999', discount: "50%", saleAmount : "2499", img: product5, cls: classes.p1, gradientColors: gradients.p1,
            mainhighlight: [
                {
                    title: "Real 4mp", img: icon8
                },
                {
                    title: "Ip67 water resistant", img: icon9
                },
                {
                    title: "1 yr home service", img: icon10
                },
                {
                    title: "Inbuilty memory", img: icon11
                },
                {
                    title: "Motion follow", img: icon12
                },
                {
                    title: "2 way audio", img: icon13
                },
                {
                    title: "IR night vision", img: icon14
                },
                {
                    title: "Smart alarm", img: icon4
                },
            ]
            , technicalHightlight: [
                { title: "Chip Processor", description: "NT98566" },
                { title: "Sensor", description: "SC8238" },
                { title: "Lens", description: "3.6mm" },
                { title: "Connection way", description: "Wireless/wired/AP hotpot connection/Wireless recording" },
                { title: "Wireless Method", description: "802.1 1a/b/g/n transmission protocol" },
                { title: "Antenna method", description: "External antenna:3dB antenna*2" },
                { title: "Wired Connection", description: "TCP/IPv4" },
            ]
        },
        {
            id: 6, name: 'Oval' ,cat: "Outdoor Camera Sensor", actualAmount: '6999', discount: "50%", saleAmount : "3499",img: product6, cls: classes.p2, gradientColors: gradients.p2,
            mainhighlight: [
                {
                    title: "Real 8mp", img: icon8
                },
                {
                    title: "Ip67 water resistant", img: icon9
                },
                {
                    title: "1 yr home service", img: icon10
                },
                {
                    title: "Inbuilty memory", img: icon11
                },
                {
                    title: "Motion follow", img: icon12
                },
                {
                    title: "2 way audio", img: icon13
                },
                {
                    title: "IR night vision", img: icon14
                },
                {
                    title: "Smart alarm", img: icon4
                },
            ]
            , technicalHightlight: [
                { title: "Chip Processor", description: "XM530V200" },
                { title: "Sensor", description: "SC401AI" },
                { title: "Lens", description: "3.6mm" },
                { title: "Connection way", description: "Wireless/wired/AP hotpot connection/Wireless recording" },
                { title: "Wireless Method", description: "802.1 1a/b/g/n transmission protocol" },
                { title: "Antenna method", description: "External antenna:3dB antenna*2" },
                { title: "Wired Connection", description: "TCP/IPv4" },
            ]
        },
        {
            id: 7, name: 'Gem', cat: "Outdoor Camera Sensor", actualAmount: '6199', discount: "50%", saleAmount : "3099", img: product7, cls: classes.p3, gradientColors: gradients.p3,
            mainhighlight: [
                {
                    title: "Real 4mp", img: icon8
                },
                {
                    title: "Ip67 water resistant", img: icon9
                },
                {
                    title: "1 yr home service", img: icon10
                },
                {
                    title: "Inbuilty memory", img: icon11
                },
                {
                    title: "Motion follow", img: icon12
                },
                {
                    title: "2 way audio", img: icon13
                },
                {
                    title: "IR night vision", img: icon14
                },
                {
                    title: "Smart alarm", img: icon4
                },
            ]
            , technicalHightlight: [
                { title: "Chip Processor", description: "XM530V200" },
                { title: "Sensor", description: "SC401AI" },
                { title: "Lens", description: "3.6mm" },
                { title: "Connection way", description: "Wireless/wired/AP hotpot connection/Wireless recording" },
                { title: "Wireless Method", description: "802.1 1a/b/g/n transmission protocol" },
                { title: "Antenna method", description: "External antenna:3dB antenna*2" },
                { title: "Wired Connection", description: "TCP/IPv4" },
            ]
        },
        {
            id: 8, name: 'Echo',cat: "Indoor Camera Sensor", actualAmount: '3999', discount: "50%", saleAmount : "1999", img: product8, cls: classes.p4, gradientColors: gradients.p4,
            mainhighlight: [
                {
                    title: "Real 2mp", img: icon8
                },
                {
                    title: "Alexa and google assistant support", img: icon9
                },
                {
                    title: "1 yr home service", img: icon10
                },
                {
                    title: "Inbuilty memory", img: icon11
                },
                {
                    title: "Motion follow", img: icon12
                },
                {
                    title: "2 way audio", img: icon13
                },
                {
                    title: "IR night vision", img: icon14
                },
                {
                    title: "Smart alarm", img: icon4
                },
            ]
            , technicalHightlight: [
                { title: "Processor", description: "530V200" },
                { title: "Sensor", description: "SC2336P" },
                { title: "Lens", description: "3.6mm" },
                { title: "Connection way", description: "Wireless/wired/AP hotpot connection/Wireless recording" },
                { title: "Wireless Method", description: "802.1 1a/b/g/n transmission protocol" },
                { title: "Antenna method", description: "External antenna:3dB antenna*2" },
                { title: "Wired Connection", description: "TCP/IPv4" },
            ]
        },
        {
            id: 9, name: 'Wave', cat: "Indoor Camera Sensors", actualAmount: '3999', discount: "50%", saleAmount : "1999", img: product9, cls: classes.p3, gradientColors: gradients.p3,
            mainhighlight: [
                {
                    title: "Real 2mp", img: icon8
                },
                {
                    title: "Alexa and google assistant support", img: icon9
                },
                {
                    title: "1 yr home service", img: icon10
                },
                {
                    title: "Inbuilty memory", img: icon11
                },
                {
                    title: "Motion follow", img: icon12
                },
                {
                    title: "2 way audio", img: icon13
                },
                {
                    title: "IR night vision", img: icon14
                },
                {
                    title: "Smart alarm", img: icon4
                },
            ]
            , technicalHightlight: [
                { title: "Processor", description: "530V200" },
                { title: "Sensor", description: "SC2336P" },
                { title: "Lens", description: "3.6mm" },
                { title: "Connection way", description: "Wireless/wired/AP hotpot connection/Wireless recording" },
                { title: "Wireless Method", description: "802.1 1a/b/g/n transmission protocol" },
                { title: "Antenna method", description: "External antenna:3dB antenna*2" },
                { title: "Wired Connection", description: "TCP/IPv4" },
            ]
        },

    ];


    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false, // Ensure the animation triggers every time you scroll
        });
    
        // Reinitialize AOS when component updates, if necessary
        AOS.refresh();
    }, []);

    const productsRef = useRef(null);
    useEffect(() => {
        setFilteredProducts(products);
    }, []);

    useEffect(() => {
        if (searchTerm) {
            const filtered = products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
            setFilteredProducts(filtered);
            // Scroll to the product section when search term changes
            productsRef.current.scrollIntoView({ behavior: 'smooth' });
        } else {
            setFilteredProducts(products);
        }
    }, [searchTerm]);


    // useEffect(() => {
    //     const observer = new IntersectionObserver((entries) => {
    //         entries.forEach(entry => {
    //             if (entry.isIntersecting) {
    //                 entry.target.classList.add('fadeInUp');
    //                 entry.target.classList.remove('hidden');
    //             }
    //         });
    //     }, { threshold: 0.1 });

    //     const items = document.querySelectorAll('.productItem');
    //     items.forEach(item => {
    //         item.classList.add('hidden');
    //         observer.observe(item);
    //     });

    //     return () => {
    //         items.forEach(item => {
    //             observer.unobserve(item);
    //         });
    //     };
    // }, [filteredProducts]);


    const toggleProductsView = () => {
        setShowAllProducts(!showAllProducts);
        if (!showAllProducts) {
            setTimeout(() => {
                productsRef.current.scrollIntoView({ behavior: 'smooth' });
            }, 500); // No delay needed for smooth scrolling to the top
        } else {
            productsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };


    const openModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedProduct(null);
        setIsModalOpen(false);
    };


    return (

        <div id="product" ref={productsRef}>
            <Heading heading="Our Products" highlight="Our Latest" subtitle="Find the best product" />

            <div className={classes.ProductSlider} >

                {filteredProducts.length > 0 ? (
                    showAllProducts ? (
                        <div className={`${classes.allProducts} ${showAllProducts ? classes.showAllProducts : ''}`}>
                            <div className={classes.productList}>
                                {filteredProducts.map((product, index) => (
                                    <div key={product.id} className={classes.productItem} 
                                    >
                                        <Product cls={product.cls}
                                            data={product} gradientColors={product.gradientColors} onClick={() => openModal(product)} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <Swiper
                            pagination={{ type: 'progressbar' }}
                            navigation={true}
                            modules={[Autoplay, Pagination, Navigation]}
                            loop={true}
                            style={{padding:"20px"}}
                            autoplay={{ delay: 5000, disableOnInteraction: true }}
                            className={'home_slider home_slider1 prmodal'}
                            slidesPerView={1}
                            breakpoints={{
                                360: { slidesPerView: 1 },
                                690: { slidesPerView: 2 },
                                1000: { slidesPerView: 3 },
                                1200: { slidesPerView: 4 }
                            }}
                            spaceBetween={30}
                        >
                            {filteredProducts.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <Product 
                                        onClick={() => openModal(item)} data={item} cls={item.cls} 
                                        index={index}
                                        gradientColors={item.gradientColors} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )
                ) : (
                    <Swiper
                    pagination={{ type: 'progressbar' }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    loop={true}
                    style={{padding:"20px"}}
                    autoplay={{ delay: 5000, disableOnInteraction: true }}
                    className={'home_slider home_slider1 prmodal'}
                    slidesPerView={1}
                    breakpoints={{
                        360: { slidesPerView: 1 },
                        690: { slidesPerView: 2 },
                        1000: { slidesPerView: 3 },
                        1200: { slidesPerView: 4 }
                    }}
                    spaceBetween={30}
                >
                    {products.map((item, index) => (
                        <SwiperSlide key={index}>
                            <Product 
                                onClick={() => openModal(item)} data={item} cls={item.cls} 
                                index={index}
                                gradientColors={item.gradientColors} />
                        </SwiperSlide>
                    ))}
                </Swiper>
                    // <div className={classes.noProducts}>
                    //     <p>no product found!</p>
                    // </div>
                )}
                {filteredProducts.length > 0 && (
                    <button className={classes.view} onClick={toggleProductsView}>
                        {showAllProducts ? 'View Less' : 'View More'}
                    </button>
                )}

                {isModalOpen && <ProductDetail show={isModalOpen} onHide={closeModal} productData={selectedProduct} />}

            </div>

        </div>

    );
}

export default ProductSlider

