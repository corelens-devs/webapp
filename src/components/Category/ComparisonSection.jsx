import React from "react";

const ComparisonSection = () => {
  const comparisonData = [
    {
      point: "Power",
      wired: "Runs from vehicle battery",
      wireless: "Has built-in battery (needs charging)",
    },
    {
      point: "Installation",
      wired: "Fixed permanently inside the vehicle",
      wireless: "Just switch it on and place it anywhere",
    },
    {
      point: "Detection Risk",
      wired: "Hard",
      wireless: "Extremely hard",
    },
    {
      point: "Lifespan",
      wired: "Works non-stop",
      wireless: "Works till battery lasts (few weeks to 3 months)",
    },
    {
      point: "Engine Cut Off",
      wired: true,
      wireless: false,
    },
    {
      point: "Tamper Alert",
      wired: true,
      wireless: false,
    },
    {
      point: "Geo Fencing",
      wired: true,
      wireless: true,
    },
    {
      point: "Annual Sim Recharge (from year 2)",
      wired: "₹899/-",
      wireless: "₹899/-",
    },
  ];

  const renderValue = (value) => {
    if (typeof value === "boolean") {
      return value ? (
        <div className="check-icon-green">✓</div>
      ) : (
        <div className="cross-icon-red">✗</div>
      );
    }
    return value;
  };

  return (
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
              {comparisonData.map((row, index) => (
                <tr key={index} className="comparison-data-row">
                  <td className="comparison-data-cell points-cell">
                    {row.point}
                  </td>
                  <td className="comparison-data-cell wired-cell">
                    {renderValue(row.wired)}
                  </td>
                  <td className="comparison-data-cell wireless-cell">
                    {renderValue(row.wireless)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
