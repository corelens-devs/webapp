import React from 'react';
import { Link } from 'react-router-dom';
import '../css/notfound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="wrapper inner-box">
        <div className="not-found-content">
          <div className="not-found-illustration">
            <div className="browser-mockup">
              <div className="browser-header">
                <div className="browser-buttons">
                  <div className="btn red"></div>
                  <div className="btn yellow"></div>
                  <div className="btn green"></div>
                </div>
                <div className="address-bar"></div>
              </div>
              <div className="browser-content">
                <div className="error-paper">
                  <div className="error-code">404</div>
                  <div className="sad-face">☹</div>
                </div>
              </div>
            </div>
          </div>

          <div className="not-found-text">
            <h1>This Page Doesn't Exist</h1>
            <p>Sorry, the page you were looking for is no longer available.</p>
            <Link to="/" className="back-home-btn">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;