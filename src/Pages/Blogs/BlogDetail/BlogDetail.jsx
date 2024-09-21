import React, { useEffect, useState } from "react";
import styles from "./BlogDetail.module.css";
import { Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../../Components/Navbar/Navbar/Navbar";
import Footer from "../../../Components/Footer/Footer";
import BlogCard from "../BlogCard";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";

const BlogDetail = () => {
    const [blogs, setBlogs] = useState({})
    const [relatedBlogs, setRelatedBlogs] = useState([])

    const { id } = useParams()
    const getBlogs = async () => {

        const register = `https://corelens.awarno.com/api/website/blog?id=${id}`
        let response = await axios.get(register, {
            headers: {
                "Content-Type": "application/json",
            },
        })

        setBlogs(response.data.data?.blogDetails)
        setRelatedBlogs(response.data.data?.relatedBlogs)
    }
    
    useEffect(() => {
        getBlogs()
    }, [])

    const navigate = useNavigate()
    return (
        <React.Fragment>
            <Navbar />
            <div className={styles.main_section}>
                <Container>
                    <p className="text-start mt-0 mb-5 fw-medium text-dark" style={{ fontFamily: '"Inter", san-serif', cursor: "pointer" }} onClick={() => navigate('/blog')}><FaArrowLeft style={{ fontSize: "15px", marginRight: "10px" }} />
                        Back</p>
                    <h6>
                        {blogs?.title}
                    </h6>
                    <p style={{ fontSize: "18px", marginBlock: "20px" }}>
                        {blogs.sub_title}
                    </p>

                    <div className="d-flex gap-2 mt-3">
                        <div className={styles.span_div}>
                            <span>{blogs.blog_category_id?.name}</span>
                            <span>15 min read</span>
                            <span>Share</span>
                        </div>

                    </div>

                    <img src={blogs?.images_url} alt={blogs.blog_category_id?.name} />
                    <p style={{ textIndent: '40px', marginTop: "20px" }}>
                        {blogs?.description}

                    </p>
                </Container>
                <Container>
                    <div className={styles.bottom_section}>
                        <h4>Related Blogs</h4>

                        <Row>
                            {relatedBlogs?.map((item, index) =>
                                <BlogCard item={item} />
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

export default BlogDetail;
