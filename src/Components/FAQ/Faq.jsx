import React from 'react'
import Accordion from 'react-bootstrap/Accordion';
import Heading from '../Heading/Heading'
import classes from "./Faq.module.css"

const Faq = () => {
  return (
    <div>
        <Heading heading={'Frequently Asked Questions'} />
        <div className={classes.accord_divv}>

    <Accordion>
      {/* <Accordion.Item eventKey="0" className={classes.accord}>
        <Accordion.Header className={classes.head}>How long does the recorded footage stay stored on the system?</Accordion.Header>
        <Accordion.Body className={classes.para}>
        Our system typically retains recorded footage for 12 to 15 days, allowing you to review past events with ease.
        </Accordion.Body>
      </Accordion.Item> */}
      <Accordion.Item eventKey="1" className={classes.accord}>
        <Accordion.Header className={classes.head}>How do I extend the range of the wireless cameras?</Accordion.Header>
        <Accordion.Body className={classes.para}>
        To extend the range of our wireless cameras, you can use Wi-Fi extenders strategically placed within your property. Download our app to buy wifi extenders.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2" className={classes.accord}>
        <Accordion.Header className={classes.head}>Do you offer professional installation services?</Accordion.Header>
        <Accordion.Body className={classes.para}>
        No, we don’t provide professional installation services yet , but we assist with any help required through our toll free number 1800-313-4207.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3" className={classes.accord}>
        <Accordion.Header className={classes.head}>Are there any limitations on the number of cameras I can install in a single system?</Accordion.Header>
        <Accordion.Body className={classes.para}>
        There are no strict limitations on the number of cameras you can install in our system. You can scale up your network according to your needs.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="4" className={classes.accord}>
        <Accordion.Header className={classes.head}>Are your cameras compatible with voice assistants like Amazon Alexa or Google Assistant?</Accordion.Header>
        <Accordion.Body className={classes.para}>
        Yes, our cameras are compatible with popular voice assistants such as Amazon Alexa and Google Assistant, allowing for convenient voice control and integration with smart home ecosystems.
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