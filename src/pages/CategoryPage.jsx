import React from "react";
import { useParams } from "react-router-dom";
import { getCategoryContent } from "../data/categories";
import BannerSection from "../components/Category/BannerSection";
import ProductSection from "../components/Category/ProductSection";
import FeaturesSection from "../components/Category/FeaturesSection";
import HowItWorksSection from "../components/Category/HowItWorksSection";
import WhyChooseUsSection from "../components/Category/WhyChooseUsSection";
import TrustedBrandsSection from "../components/Category/TrustedBrandsSection";
import HowItWorksForYouSection from "../components/Category/HowItWorksForYouSection";
import WhyChooseUsCategorySection from "../components/Category/WhyChooseUsCategorySection";
import TrustedBySection from "../components/Category/TrustedBySection";
import "../components/Category/CategoryPage.css";
import "../css/style.css";
import "../css/product-details.css";

const CategoryPage = () => {
  const { slug } = useParams();
  const categoryData = getCategoryContent(slug);

  // Map slug to category display names
  const getCategoryDisplayName = (slug) => {
    const categoryNames = {
      "door-locks": "Smart\nDoorLocks",
      "smart-doorlocks": "Smart\nDoorLocks",
      "cam-sensors": "Camera\nSensors",
      "camera-sensors": "Camera\nSensors",
      "gps-trackers": "Gps\nTrackers",
      "motion-sensors": "Motion\nSensors",
      accessories: "Accessories",
    };
    return categoryNames[slug] || slug.toUpperCase().replace("-", "\n");
  };

  if (!categoryData) {
    return (
      <div className="category-not-found">
        <div className="inner-wrap">
          <h1>Category Not Found</h1>
          <p>The requested category could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`category-page ${slug}`}>
      <BannerSection banner={categoryData.banner} />
      <ProductSection
        products={categoryData.products}
        categorySlug={slug}
        categoryName={getCategoryDisplayName(slug)}
      />

      <HowItWorksForYouSection
        howItWorksForYou={categoryData.howItWorksForYou}
      />
      {/* Comparison Section - Only for GPS Trackers */}
      {slug === "gps-trackers" && (
        <section className="comparison-table-section">
          <div className="inner-wrap">
            <div className="comparison-section-header">
              <h2 className="comparison-section-title">
                Make a comparison between two
              </h2>
            </div>
            <div className="comparison-table-wrapper">
              <table className="comparison-table-main">
                <thead>
                  <tr className="comparison-header-row">
                    <th className="comparison-header-cell-main points-header">
                      Points
                    </th>
                    <th className="comparison-header-cell-main wired-header">
                      Wired
                    </th>
                    <th className="comparison-header-cell-main wireless-header">
                      Wireless
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="comparison-data-row">
                    <td className="comparison-data-cell points-cell">Power</td>
                    <td className="comparison-data-cell wired-cell">
                      Runs from vehicle battery
                    </td>
                    <td className="comparison-data-cell wireless-cell">
                      Has built-in battery (needs charging)
                    </td>
                  </tr>
                  <tr className="comparison-data-row">
                    <td className="comparison-data-cell points-cell">
                      Installation
                    </td>
                    <td className="comparison-data-cell wired-cell">
                      Fixed permanently inside the vehicle
                    </td>
                    <td className="comparison-data-cell wireless-cell">
                      Just switch it on and place it anywhere
                    </td>
                  </tr>
                  <tr className="comparison-data-row">
                    <td className="comparison-data-cell points-cell">
                      Detection Risk
                    </td>
                    <td className="comparison-data-cell wired-cell">Hard</td>
                    <td className="comparison-data-cell wireless-cell">
                      Extremely hard
                    </td>
                  </tr>
                  <tr className="comparison-data-row">
                    <td className="comparison-data-cell points-cell">
                      Lifespan
                    </td>
                    <td className="comparison-data-cell wired-cell">
                      Works non-stop
                    </td>
                    <td className="comparison-data-cell wireless-cell">
                      Works till battery lasts (few weeks to 3 months)
                    </td>
                  </tr>
                  <tr className="comparison-data-row">
                    <td className="comparison-data-cell points-cell">
                      Engine Cut Off
                    </td>
                    <td className="comparison-data-cell wired-cell">
                      <div className="check-icon-green">✓</div>
                    </td>
                    <td className="comparison-data-cell wireless-cell">
                      <div className="cross-icon-red">✗</div>
                    </td>
                  </tr>
                  <tr className="comparison-data-row">
                    <td className="comparison-data-cell points-cell">
                      Tamper Alert
                    </td>
                    <td className="comparison-data-cell wired-cell">
                      <div className="check-icon-green">✓</div>
                    </td>
                    <td className="comparison-data-cell wireless-cell">
                      <div className="cross-icon-red">✗</div>
                    </td>
                  </tr>
                  <tr className="comparison-data-row">
                    <td className="comparison-data-cell points-cell">
                      Geo Fencing
                    </td>
                    <td className="comparison-data-cell wired-cell">
                      <div className="check-icon-green">✓</div>
                    </td>
                    <td className="comparison-data-cell wireless-cell">
                      <div className="check-icon-green">✓</div>
                    </td>
                  </tr>
                  <tr className="comparison-data-row">
                    <td className="comparison-data-cell points-cell">
                      Annual Sim Recharge (from year 2)
                    </td>
                    <td className="comparison-data-cell wired-cell">₹899/-</td>
                    <td className="comparison-data-cell wireless-cell">
                      ₹899/-
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
      <FeaturesSection features={categoryData.features} />
      <HowItWorksSection howItWorks={categoryData.howItWorks} />

      {/* WHY CHOOSE US Section */}
      <WhyChooseUsCategorySection whyChooseUs={categoryData.whyChooseUs} />

      {/* TRUSTED BY Section */}
      <TrustedBySection trustedBy={categoryData.trustedBy} />
      <TrustedBrandsSection brands={categoryData.brands} />
    </div>
  );
};

export default CategoryPage;
