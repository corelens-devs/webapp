import React, { useEffect, useState } from 'react'
import Heading from '../Heading/Heading'
import classes from "./BlogSection.module.css"
import blog1 from "../../Assets/blog1.png"
import blog2 from "../../Assets/blog2.png"
import blog3 from "../../Assets/blog3.png"
import BlogCard from '../../Pages/Blogs/BlogCard'
import { Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import NewPagination from '../NewPagination/NewPagination'

const BlogSection = () => {
  
   
    const navigate = useNavigate()

    const [blogs, setBlogs] = useState([])
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const [pageInfo, setPageInfo] = useState({})

    const getBlogs = async () => {

        const register = `https://corelens.awarno.com/api/website/blogs?limit=3&page=1`
        let response = await axios.get(register, {
            headers: {
                "Content-Type": "application/json",
            },
        })

        console.log(response.data.data?.docs)
        setBlogs(response.data.data?.docs)
        setPageInfo({ ...response.data.data, docs: null })

    }
    const paginationProps = {
        setPage,
        pageInfo
    }

    useEffect(() => {
        getBlogs()
    }, [])
    return (
        <div id="blogs">
            <Heading heading={"Blogs"} para="" cls={classes.div_head} />
            <div className={classes.bottom_section}>

                <Row>
                    {blogs.length > 0 ?
                        <>
                            {
                                blogs?.map((item, index) =>
                                    <BlogCard item={item} />
                                )}
                            <NewPagination {...paginationProps} />
                        </>

                        : "no blogs found!"}
                    <button className={classes.btn} onClick={() => navigate('/blog')}>More Blogs</button>
                </Row>
            </div>
        </div>
    )
}

export default BlogSection