import React, { useEffect } from "react";
import Banner from "../components/Banner";
import ProductSection from "../components/ProductSection";
import VideoSection from "../components/VideoSection";
import EcosystemSection from "../components/EcosystemSection";
import BuySection from "../components/BuySection";
import TestimonialSection from "../components/TestimonialSection";
import DemoSection from "../components/DemoSection";

const Home = () => {
  useEffect(() => {
    // Set meta title
    document.title = "Corelens - India's First On-Demand Surveillance App | CCTV & GPS Trackers";

    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Discover Corelens, India\'s first on-demand surveillance app. Buy CCTV cameras and GPS trackers for complete home security. Book surveillance through our app. Available on Android and iOS.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Discover Corelens, India\'s first on-demand surveillance app. Buy CCTV cameras and GPS trackers for complete home security. Book surveillance through our app. Available on Android and iOS.';
      document.getElementsByTagName('head')[0].appendChild(meta);
    }

    // Set meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'Corelens, on-demand surveillance app, surveillance app India, CCTV cameras India, buy CCTV online, GPS trackers India, home security solutions, mobile surveillance app, Android surveillance app, iOS surveillance app, smart home security, CCTV installation India, book surveillance service, best GPS tracker India, affordable CCTV cameras India');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = 'Corelens, on-demand surveillance app, surveillance app India, CCTV cameras India, buy CCTV online, GPS trackers India, home security solutions, mobile surveillance app, Android surveillance app, iOS surveillance app, smart home security, CCTV installation India, book surveillance service, best GPS tracker India, affordable CCTV cameras India';
      document.getElementsByTagName('head')[0].appendChild(meta);
    }

    // Cleanup function to reset title when component unmounts
    return () => {
      document.title = "Corelens - Smart Security Solutions";
    };
  }, []);

  return (
    <div className="home-page">
      <Banner />
      <EcosystemSection />
      <ProductSection />
      <VideoSection />
      <DemoSection />
      <BuySection />
      <TestimonialSection />
    </div>
  );
};

export default Home;