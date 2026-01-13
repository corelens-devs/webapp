import React from "react";
import { image } from "../utils/asset";

const EcosystemSection = () => {
  return (
    <div className="wrapper">
      <div className="inner-box">
        <div className="title-group echodec">
          <h2 className="heading text-heading">
            We offer Anti-Theft devices to keep your
            <span className="highlight">Home and vehicles safe against theft</span>
          </h2>
        </div>
      </div>
      <section className="echosystem-sec">
        <video
          className="ecosystem-video-background"
          src="https://vivekbisht.com/corelens-ecosystem.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src="./images/corelens-framework.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="title-group">
          <h2 className="heading">Connected Ecosytem</h2>
        </div>
        <div className="echo-content"></div>
      </section>
    </div>
  );
};

export default EcosystemSection;
