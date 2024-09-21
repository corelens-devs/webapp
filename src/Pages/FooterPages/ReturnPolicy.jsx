import React, { useState } from 'react'
import classes from "./Term.module.css"
import Footer from '../../Components/Footer/Footer';
import Navbar from '../../Components/Navbar/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const ReturnPolicy = () => {
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
        <h4 className='text-start mb-4'>Return Policy:</h4>

        <p>
          You may return items within
          <b className='text-dark'> * 10 days*</b> of receipt, provided they are in
          <b className='text-dark'> *new or like-new condition*</b> and in their
          <b className='text-dark'> *original packaging*</b> with all accessories.
          To initiate a return, use the Purchase history section in the Corelens app or
          contact our support team for a <b className='text-dark'>*prepaid return label.
            Refunds will be processed within ** 3–5 business days*</b> after receipt and inspection
          of the returned item. For any issues or questions, please reach out to our customer
          support team.


          <br />
          <br />
          <p>At Corelens, we are committed to ensuring customer satisfaction and offer a straightforward return policy to address any concerns with your purchase. :</p>

          <p>You may initiate a return within <b className='text-dark'>*10 days of receiving the product, provided the item is in **new or like-new condition. The product must be returned in its **original packaging</b>, including all accessories, manuals, and documentation. We kindly ask that the item shows no signs of use, wear, or damage to qualify for a full refund.
          </p>

        </p>

        <p>
          To start a return, please visit the Purchase History section in the Corelens app or contact our customer support team. We will provide you with a <b className='text-dark'>*prepaid return shipping label*</b> to securely send the product back to us. Once we receive and inspect the returned item, your refund will be processed to your original payment method within <b className='text-dark'>* 3–5 business days*</b>.
        </p>


        <p>
          If the returned item is found to be damaged, used, or missing components, a <b className='text-dark'>*restocking fee*</b> may apply, or the return may be declined. We recommend securely packing the item and keeping the original packaging for an easier return process.
        </p>

        <p>
          Please note that return shipping costs will be covered by Corelens for defective or damaged items. For other reasons, the return shipping fee may be deducted from the refund amount.
        </p>

        <p>
          For any questions or concerns regarding your return, our customer support team is available through the Corelens app to assist you. Your satisfaction is our priority, and we are here to ensure a smooth return experience.
        </p>

      </div>
      <Footer />
    </>

  )
}

export default ReturnPolicy