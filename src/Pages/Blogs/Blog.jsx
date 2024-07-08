// import React from 'react';
// import { Container, Row, Col, Card, Button } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const blogs = [
//   {
//     date: '19 Nov, 2024',
//     image: 'image1.jpg',
//     title: 'How can you Book Class in three easy steps and how its help in your kids in studies',
//     description: 'Open your doors to a wider consumer audience...',
//     category: 'Category',
//     readTime: '15 min read',
//   },
//   // Add more blog objects here...
// ];

// const Blog = () => {
//   return (
//     <Container>
//       <Button variant="link" className="mb-4">Back</Button>
//       <h1>Blogs</h1>
//       <Row>
//         <Col xs={12} className="mb-4">
//           <Card>
//             <Card.Img variant="top" src="image1.jpg" />
//             <Card.Body>
//               <Card.Title>
//                 How can you Book Class in three easy steps and how its help in your kids in studies
//               </Card.Title>
//               <Card.Text>
//                 Open your doors to a wider consumer audience; the future market demand for music and instrumental online education can devalue old models.
//               </Card.Text>
//               <Button variant="primary">Read More</Button>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//       <Row>
//         {blogs.map((blog, index) => (
//           <Col md={4} sm={6} xs={12} className="mb-4" key={index}>
//             <Card>
//               <Card.Img variant="top" src={blog.image} />
//               <Card.Body>
//                 <Card.Text>{blog.date}</Card.Text>
//                 <Card.Title>{blog.title}</Card.Title>
//                 <Button variant="primary">Read More</Button>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </Container>
//   );
// };

// export default Blog;
import React from "react";
import styles from "./Blog.module.css";
import { Col, Container, Row } from "react-bootstrap";
import { MdOutlineArrowOutward } from "react-icons/md";
import moment from 'moment'
import Navbar from "../../Components/Navbar/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import blog_img from "../../Assets/blog_img.png"
import blog1 from "../../Assets/blog1.png"
import blog2 from "../../Assets/blog2.png"
import blog3 from "../../Assets/blog3.png"
import blog4 from "../../Assets/blog4.png"
import blog5 from "../../Assets/blog5.png"
import blog6 from "../../Assets/blog6.png"
import BlogCard from "./BlogCard";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Blog = () => {
    const navigate = useNavigate()

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
        {
            date: '19 Nov, 2024',
            image: blog4,
            title: 'How can you Book Class in three easy steps and how its help in your kids in studies',
            sub_title: 'Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. ',
            category: 'Category',
            readTime: '15 min read',
        },
        {
            date: '19 Nov, 2024',
            image: blog5,
            title: 'How can you Book Class in three easy steps and how its help in your kids in studies',
            sub_title: 'Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. ',
            category: 'Category',
            readTime: '15 min read',
        },
        {
            date: '19 Nov, 2024',
            image: blog6,
            title: 'How can you Book Class in three easy steps and how its help in your kids in studies',
            sub_title: 'Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. ',
            category: 'Category',
            readTime: '15 min read',
        },
        // Add more blog objects here...
    ];
    return (
        <React.Fragment>
            <Navbar />

            {/* --------hero-section-------- */}
            <div className={styles.main_hero_section}>
                <Container >
                    <div className={styles.hero_section}>
                    <p className="text-start mb-4 fw-medium text-dark" style={{fontFamily:'"Inter", san-serif', cursor:"pointer"}} onClick={() =>navigate('/')}><FaArrowLeft style={{fontSize:"15px" , marginRight:"10px"}}/>
                    Back</p>
                        <h6>Blogs</h6>


                        <Row className={styles.row1}>
                            <Col md={5} className={styles.sm1} sm={12}>
                                <div>
                                    <img src={blog_img} />
                                </div>
                            </Col>
                            <Col className={styles.sm1} md={7} sm={12}>
                                <div className={styles.right_section}>
                                    <div className={styles.span_div}>
                                        <span>Category</span>
                                        <span>15 min read</span>
                                    </div>
                                    <h6>
                                        How can you Book Class in three easy steps and how its help in your kids in studies
                                    </h6>
                                    <p>
                                        Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.
                                    </p>
                                    <a href={"/blogs/details"} >
                                        {/* <a href={"/blogs/details/" + blogs[0]?._id} > */}
                                        Read More <MdOutlineArrowOutward />
                                    </a>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>

                {/* -----------bottom-section---------- */}

                <Container className="p-0">
                    <div className={styles.bottom_section}>
                        {/* <h6>Latest blogs</h6> */}

                        <Row>
                            {blogs.map((item, index) => 
                            <BlogCard item={item} />
                            // {
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
                <Footer />
        </React.Fragment>
    );
};

export default Blog;
