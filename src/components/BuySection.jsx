import React from "react";
import "./BuySection.css";
import { image } from "../utils/asset";

const BuySection = () => {
  return (
    <section className="buy-section">
      <div className="wrapper">
        <div className="inner-wrap">
          <div className="buy-header">
            <div className="title-group">
              <h2 className="heading">HOW CAN YOU BUY</h2>
              <p className="subtext">
                Choose the easiest way to get started with Corelens smart
                security solutions — whether you need expert advice, a hands-on
                demo, or want to order directly from your phone. We’ve made the
                entire buying process simple, fast, and flexible — just the way
                it should be.
              </p>
            </div>
            <div className="whatsapp-card">
              <div className="phone-number">9211819260</div>
              <div className="whatsapp-text">SHOP ON WHATSAPP</div>
              <div className="description">
                Send Us A Message To Get Recommendations & Place Your Order
                Instantly.
              </div>
            </div>
          </div>
          <div className="buy-body">
            <div className="buy-card help-card">
              <div className="card-content">
                <div>
                  <div className="card-title">NEED HELP CHOOSING SECURITY?</div>
                  <div className="card-subtitle">1800-313-4207</div>
                </div>
                <div className="icon-area">
                  {/* Icon can be added here if needed */}
                </div>
              </div>
            </div>
            <div className="buy-card demo-card">
              <div className="card-content">
                <div>
                  <div className="card-title">FREE HOME DEMO</div>
                  <div className="card-description">
                    See How Our CCTV And Smart Locks Work Right At Your
                    Doorstep.
                  </div>
                </div>
                <div className="icon-area">
                  {/* Icon can be added here if needed */}
                </div>
              </div>
            </div>
            <div className="buy-card app-card">
              <div className="card-content">
                <div>
                  <div className="card-title">DOWNLOAD OUR APP</div>
                  <div className="card-description">
                    Explore Our Full Range Of Smart Security Products In Our
                    App.
                  </div>
                </div>
                <div className="icon-area">
                  {/* Icon can be added here if needed */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuySection;
