import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar/Navbar";
import classes from "./AccountDeletion.module.css";
import axios from "axios";

const AccountDeletion = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [reason, setReason] = useState("");
  const [buttonText, setButtonText] = useState("Submit");
  const [buttonColor, setButtonColor] = useState("rgb(217 13 2)");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    const isPhoneValid = validatePhone(phone);
    const isEmailValid = validateEmail(email);
    const isNameValid = validateName(name);
    const isReasonValid = validateReason(reason);

    if (!isPhoneValid || !isEmailValid || !isNameValid || !isReasonValid) {
      let msg = "";
      if (!isPhoneValid) msg += "Phone, ";
      if (!isEmailValid) msg += "Email, ";
      if (!isNameValid) msg += "Name (should be >5 characters), ";
      if (!isReasonValid) msg += "Reason (should be >20 characters), ";
      msg+= "is not valid."
      alert(msg);
    } else {
      setButtonText("Submitting...");
      setButtonColor("gray");

      axios.post("https://backend.corelens.in/api/website/account-deletion",
        {
          name: name,
          email: email,
          phone: phone,
          reason: reason,
          source: "website",
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        setSubmitted(true);
      })
      .catch((err) => {
        console.error(err);
        alert("Error while submitting. Please try again.");
        setButtonText("Submit");
        setButtonColor("rgb(217 13 2)");
      });

    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhone = (phone) => {
    const re = /^\d{10}$/;
    return re.test(String(phone).replace(/\s/g, ""));
  }

  const validateName = (name) => {
    return String(name).trim().length >= 5;
  };

  const validateReason = (reason) => {
    return String(reason).trim().length >= 20;
  };

  return (
    <React.Fragment>
      <Navbar />
      <div style={{ minHeight: "500px" }}>
        <Container>
          <div className={classes.main_div}>
            <h2>Account Data Deletion!</h2>
            <p>Fill the below form to request deletion of your data.</p>
            {!submitted ? (
              <div className={classes.form_div}>
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="phone"
                  placeholder="Enter Phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Enter Email ID"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <textarea
                  type="textarea"
                  placeholder="Enter Reason for Account Deletion"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
                <button style={{ backgroundColor: buttonColor }} onClick={handleSubmit}>
                  {buttonText}
                </button>
              </div>
            ) : (
              <p>Your details have been submitted. We will get back to you on phone/email for further processing.</p>
            )}
          </div>
        </Container>
      </div>

      <Footer />
    </React.Fragment>
  );
};

export default AccountDeletion;
