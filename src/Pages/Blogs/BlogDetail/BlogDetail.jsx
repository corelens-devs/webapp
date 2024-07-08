import React, { useEffect, useState } from "react";
import styles from "./BlogDetail.module.css";
import { Container, Row, Col } from "react-bootstrap";
import { MdOutlineArrowOutward } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import Navbar from "../../../Components/Navbar/Navbar/Navbar";
import Footer from "../../../Components/Footer/Footer";
import blog1 from "../../../Assets/blog1.png"
import blog2 from "../../../Assets/blog2.png"
import blog3 from "../../../Assets/blog3.png"
import big_blog from "../../../Assets/big_blog.png"
import BlogCard from "../BlogCard";
import { FaArrowLeft } from "react-icons/fa";

const BlogDetail = () => {
    const [data, setData] = useState([])
    // const [blogs, setBlogs] = useState([])
    const { id } = useParams()
    //   const getData = () => {
    //     sendRequest({
    //         url: `news-by-id?news_id=${id}`,
    //         headers: {
    //             'Content-type': 'application/json'
    //         }
    //     }, result => {
    //         setData(result.data)
    //     })
    // }
    // const getBlogs = () => {
    //   sendRequest({
    //     url: `news?limit=6&page=1`,
    //     headers: {
    //       'Content-type': 'application/json'
    //     }
    //   }, result => {

    //     setBlogs(result.data.docs)

    //   })
    // }
    // useEffect(() => {
    //   getBlogs()
    // }, [])
    // useEffect(() => {
    //     getData()
    // }, [])
    const blogs = [
        {
            date: '19 Nov, 2024',
            image: blog1,
            title: 'How can you Book Class in three easy steps and how its help in your kids in studies',
            sub_title: 'Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. ',
            category: 'Category',
            readTime: '15 min read',
        },
        {
            date: '19 Nov, 2024',
            image: blog2,
            title: 'How can you Book Class in three easy steps and how its help in your kids in studies',
            sub_title: 'Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. ',
            category: 'Category',
            readTime: '15 min read',
        },
        {
            date: '19 Nov, 2024',
            image: blog3,
            title: 'How can you Book Class in three easy steps and how its help in your kids in studies',
            sub_title: 'Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. ',
            category: 'Category',
            readTime: '15 min read',
        },
       
       
        // Add more blog objects here...
    ];
    const navigate = useNavigate()
    return (
        <React.Fragment>
            <Navbar />
            <div className={styles.main_section}>
                <Container>
                <p className="text-start mt-0 mb-5 fw-medium text-dark" style={{fontFamily:'"Inter", san-serif', cursor:"pointer"}} onClick={() =>navigate('/blog')}><FaArrowLeft style={{fontSize:"15px" , marginRight:"10px"}}/>
                Back</p>
                    <p className={styles.span1}>{moment(data.createdAt).format("ll")}</p>
                    <h6>
                    How can you Book Class in three easy steps and how its help in your kids in studies
                    </h6>
                    <p style={{fontSize:"18px", marginBlock:"20px"}}>
                    Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent. 
                    </p>

                    <div className="d-flex gap-2 mt-3">
                    <div className={styles.span_div}>
                                        <span>Category</span>
                                        <span>15 min read</span>
                                        <span>Share</span>
                                    </div>
                      
                    </div>

                    <img src={big_blog} alt="banner_img" />

                    <p style={{ textIndent: '40px'}}>
                    Korem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.
                    </p>
           <p style={{ textIndent: '40px'}}>
              Curabitur tempor quis eros tempus lacinia. Nam bibendum pellentesque quam a convallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Suspendisse quis arcu sem. Aenean feugiat ex eu vestibulum vestibulum. Morbi a eleifend magna. Nam metus lacus, porttitor eu mauris a, blandit ultrices nibh. Mauris sit amet magna non ligula vestibulum eleifend. Nulla varius volutpat turpis sed lacinia. Nam eget mi in purus lobortis eleifend. Sed nec ante dictum sem condimentum ullamcorper quis venenatis nisi. Proin vitae facilisis nisi, ac posuere leo.
              </p>
              <p style={{ textIndent: '40px'}}>
Nam pulvinar blandit velit, id condimentum diam faucibus at. Aliquam lacus nisi, sollicitudin at nisi nec, fermentum congue felis. Quisque mauris dolor, fringilla sed tincidunt ac, finibus non odio. Sed vitae mauris nec ante pretium finibus. Donec nisl neque, pharetra ac elit eu, faucibus aliquam ligula. Nullam dictum, tellus tincidunt tempor laoreet, nibh elit sollicitudin felis, eget feugiat sapien diam nec nisl. Aenean gravida turpis nisi, consequat dictum risus dapibus a. Duis felis ante, varius in neque eu, tempor suscipit sem. Maecenas ullamcorper gravida sem sit amet cursus. Etiam pulvinar purus vitae justo pharetra consequat. Mauris id mi ut arcu feugiat maximus.
 Mauris consequat tellus id tempus aliquet.
 </p>
 <p style={{ textIndent: '40px'}}>
               Vestibulum dictum ultrices elit a luctus. Sed in ante ut leo congue posuere at sit amet ligula. Pellentesque eget augue nec nisl sodales blandit sed et sem. Aenean quis finibus arcu, in hendrerit purus. Praesent ac aliquet lorem. Morbi feugiat aliquam ligula, et vestibulum ligula hendrerit vitae. Sed ex lorem, pulvinar sed auctor sit amet, molestie a nibh. Ut euismod nisl arcu, sed placerat nulla volutpat aliquet. Ut id convallis nisl. Ut mauris leo, lacinia sed elit id, sagittis rhoncus odio. Pellentesque sapien libero, lobortis a placerat et, malesuada sit amet dui. Nam sem sapien, congue eu rutrum nec, pellentesque eget ligula.
</p>
<p style={{ textIndent: '40px'}}>
               Vestibulum dictum ultrices elit a luctus. Sed in ante ut leo congue posuere at sit amet ligula. Pellentesque eget augue nec nisl sodales blandit sed et sem. Aenean quis finibus arcu, in hendrerit purus. Praesent ac aliquet lorem. Morbi feugiat aliquam ligula, et vestibulum ligula hendrerit vitae. Sed ex lorem, pulvinar sed auctor sit amet, molestie a nibh. Ut euismod nisl arcu, sed placerat nulla volutpat aliquet. Ut id convallis nisl. Ut mauris leo, lacinia sed elit id, sagittis rhoncus odio. Pellentesque sapien libero, lobortis a placerat et, malesuada sit amet dui. Nam sem sapien, congue eu rutrum nec, pellentesque eget ligula.

                    </p>
                </Container>

                {/* -----------bottom-section---------- */}

                <Container>
                    <div className={styles.bottom_section}>
                   <h4>Related Blogs</h4>

                        <Row>
                            {blogs?.map((item, index) =>
                            <BlogCard item={item} />
                            //  {
                            //     return (
                            //         <Col className={`${styles.mb2} p-0`} key={index} md={4} sm={12}  >
                            //             <span>{moment(item.createdAt).format("ll")}</span>
                            //             <img src={item.image} alt="blogs" />
                            //             <div className={styles.span_div2}>
                            //                 <span>Category</span>
                            //                 <span>15 min read</span>
                            //             </div>
                            //             <h5>
                            //                 {item.title}
                            //             </h5>
                            //             <p>
                            //                 {item.sub_title}.{" "}
                            //             </p>
                            //             <a href={"/blogs/details/"}>
                            //                 Read More <MdOutlineArrowOutward />
                            //             </a>
                            //         </Col>
                            //     )
                            // }
                        )

                            }

                        </Row>
                    </div>
                </Container>
            </div>

            <Footer/>
        </React.Fragment>
    );
};

export default BlogDetail;
