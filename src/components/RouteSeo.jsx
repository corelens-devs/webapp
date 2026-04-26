import React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { getOrganizationSchema, getSeoForPath } from "../seo/routeSeo";

const RouteSeo = () => {
  const location = useLocation();
  const seo = getSeoForPath(location.pathname);

  return (
    <Helmet prioritizeSeoTags>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="robots" content={seo.robots || "index, follow"} />
      <link rel="canonical" href={seo.canonical} />

      <meta property="og:type" content={seo.ogType || "website"} />
      <meta property="og:site_name" content="Corelens" />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:url" content={seo.canonical} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:locale" content="en_IN" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />

      <script type="application/ld+json">{JSON.stringify(getOrganizationSchema())}</script>
      <script type="application/ld+json">{JSON.stringify(seo.schema)}</script>
    </Helmet>
  );
};

export default RouteSeo;
