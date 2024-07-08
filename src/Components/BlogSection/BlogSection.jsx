import React from 'react'
import Heading from '../Heading/Heading'
import classes from "./BlogSection.module.css"
import blog1 from "../../Assets/blog1.png"
import blog2 from "../../Assets/blog2.png"
import blog3 from "../../Assets/blog3.png"
import BlogCard from '../../Pages/Blogs/BlogCard'
import { Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const BlogSection = () => {
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
        }
    ];
    const navigate = useNavigate()
    return (
        <div id="blogs">
            <Heading heading={"Blogs"} para="" cls={classes.div_head} />
            <div className={classes.bottom_section}>

                <Row>
                    {blogs.map((item, index) =>
                        <BlogCard item={item} />
                    )

                    }
<button className={classes.btn} onClick={()=> navigate('/blog')}>More Blogs</button>
                </Row>
            </div>
        </div>
    )
}

export default BlogSection