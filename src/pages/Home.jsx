import React from "react";
import Banner from "../components/Banner";
import ProductSection from "../components/ProductSection";
import VideoSection from "../components/VideoSection";
import EcosystemSection from "../components/EcosystemSection";
import BuySection from "../components/BuySection";
import TestimonialSection from "../components/TestimonialSection";
import DemoSection from "../components/DemoSection";
import ProofBlocks from "../components/ProofBlocks";

const Home = () => {
  return (
    <div className="home-page">
      <Banner />
      <EcosystemSection />
      <ProductSection />
      <VideoSection />
      <DemoSection />
      <ProofBlocks />
      <BuySection />
      <TestimonialSection />
    </div>
  );
};

export default Home;
