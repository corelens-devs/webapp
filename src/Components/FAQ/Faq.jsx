import React from 'react'
import Accordion from 'react-bootstrap/Accordion';
import Heading from '../Heading/Heading'
import classes from "./Faq.module.css"

const Faq = () => {
  return (
    <div>
        <Heading heading={'Frequently Asked Questions'} />
        <div>

    <Accordion>
      <Accordion.Item eventKey="0" className={classes.accord}>
        <Accordion.Header className={classes.head}>Korem ipsum dolor sit amet, consectetur adipiscing elit.</Accordion.Header>
        <Accordion.Body className={classes.para}>
        Borem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1" className={classes.accord}>
        <Accordion.Header className={classes.head}>Korem ipsum dolor sit amet, consectetur adipiscing elit.</Accordion.Header>
        <Accordion.Body className={classes.para}>
        Borem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2" className={classes.accord}>
        <Accordion.Header className={classes.head}>Korem ipsum dolor sit amet, consectetur adipiscing elit.</Accordion.Header>
        <Accordion.Body className={classes.para}>
        Borem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3" className={classes.accord}>
        <Accordion.Header className={classes.head}>Korem ipsum dolor sit amet, consectetur adipiscing elit.</Accordion.Header>
        <Accordion.Body className={classes.para}>
        Borem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="4" className={classes.accord}>
        <Accordion.Header className={classes.head}>Korem ipsum dolor sit amet, consectetur adipiscing elit.</Accordion.Header>
        <Accordion.Body className={classes.para}>
        Borem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  <footer className={classes.foot}>
<p>  Any Other Questions Left ? Email us at <a href="">Connect@corelens.in</a>
</p>  </footer>
        </div>
    </div>
  )
}

export default Faq