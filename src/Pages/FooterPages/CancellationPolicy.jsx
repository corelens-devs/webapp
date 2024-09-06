import React, { useState } from 'react'
import classes from "./Term.module.css"
import Footer from '../../Components/Footer/Footer';
import Navbar from '../../Components/Navbar/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const CancellationPolicy = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const navigate = useNavigate()
  const handleNavigate = () => {
    navigate('/')
  }
  return (
    <>
      <Navbar onSearchChange={handleSearchChange} />
      <div className={classes.main_div}>
        <div className={classes.inn_div} onClick={handleNavigate}>
          <FaArrowLeft />
          <span>Back</span>
        </div>
        <h4 className='text-start mb-4'>Cancellation Policy:</h4>

        <p>
          Customers may request order cancellations within <b className='text-dark'>* 24 hours*</b> of purchase or prior to order shipment, whichever comes first. Once the order has been processed and dispatched, cancellations will no longer be accepted. Upon successful cancellation, a full refund will be processed to the original payment method within <b className='text-dark'>* 3–5 business days*</b>. For further assistance, please reach out to our customer support team through the Corelens app.
        </p>


        <p>
          At Corelens, we strive to offer a seamless shopping experience. We understand that circumstances may change, and therefore, we offer a flexible cancellation policy for our valued customers.
        </p>

        <p>
          You may request a cancellation of your order within <b className='text-dark'>* 24 hours*</b> of placing it, or before the order has been processed and shipped, whichever occurs first. Once the order has been processed and dispatched, cancellations will no longer be accepted.
        </p>

        <p>
          To initiate a cancellation, please follow the instructions in the Corelens app under the Purchase History section, or contact our customer support team. Upon confirming your cancellation, we will process a <b className='text-dark'>*full refund*</b> to your original payment method. Refunds will typically be issued within <b className='text-dark'>* 3–5 business days*</b>, depending on your payment provider.

        </p>

        <p>
          Please note that once the order has been shipped, the cancellation request will no longer be valid. In such cases, our return and refund policy will apply, and you can initiate a return once you receive the item.
        </p>

        <p>
          For further assistance, or if you have any concerns regarding your cancellation, feel free to reach out to our customer support team directly through the Corelens app or via email. We are always here to help.
        </p>

      </div>
      <Footer />
    </>

  )
}

export default CancellationPolicy