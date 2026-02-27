import React from "react";
import { Link } from "react-router-dom";
import "../css/style.css";
import "../css/legalstyle.css";

const AccountDeletion = () => {
  return (
    <div className="legal-page">
      <section className="legal-banner-section">
        <div className="legal-banner-content">
          <h1>ACCOUNT DELETION</h1>
          <div className="legal-breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb-separator">&gt;</span>
            <span className="breadcrumb-current">Account Deletion</span>
          </div>
        </div>
      </section>

      <section className="legal-content-section">
        <div className="wrapper inner-box">
          <div className="legal-container">
            <div className="legal-text">
              <h3 className="text-start mb-4">How To Delete Your Account</h3>
              <p>
                You can request account deletion from within the Corelens app,
                or by contacting us at{" "}
                <a href="mailto:customercare@corelens.in">
                  customercare@corelens.in
                </a>
                .
              </p>

              <h4 className="text-start mb-3 mt-4">Delete from the app</h4>
              <p>
                1. Open the Corelens app and sign in.
                <br />
                2. Go to Profile.
                <br />
                3. Use the Delete Account option and confirm.
              </p>

              <h4 className="text-start mb-3 mt-4">What gets deleted</h4>
              <p>
                After verification, your account profile and associated
                app-level personal data are removed from active systems.
              </p>

              <h4 className="text-start mb-3 mt-4">What may be retained</h4>
              <p>
                Certain records may be retained for legal, tax, fraud
                prevention, dispute handling, and compliance obligations for the
                minimum period required by applicable law.
              </p>

              <h4 className="text-start mb-3 mt-4">Need help?</h4>
              <p>
                If you face any issue while deleting your account, email us at{" "}
                <a href="mailto:customercare@corelens.in">
                  customercare@corelens.in
                </a>{" "}
                with your registered phone number.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AccountDeletion;
