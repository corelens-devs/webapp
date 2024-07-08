import React from 'react'
import styles from "./Blog.module.css"
import moment from 'moment'
import { Col } from 'react-bootstrap'
import { MdOutlineArrowOutward } from 'react-icons/md'

const BlogCard = (props) => {
    const {item} = props
  return (
    <>
          <Col className={`${styles.mb2} ${styles.bottom_section}`} md={4} sm={12}  >
                                        <span>{moment(item.createdAt).format("ll")}</span>
                                        <img src={item.image} alt="blogs" />
                                        <div className={styles.span_div2}>
                                            <span>Category</span>
                                            <span>15 min read</span>
                                        </div>
                                        <h5>
                                            {item.title}
                                        </h5>
                                        <p>
                                            {item.sub_title}.{" "}
                                        </p>
                                        <a href={"/blogs/details/"}>
                                            Read More <MdOutlineArrowOutward />
                                        </a>
                                    </Col>
    </>
  )
}

export default BlogCard