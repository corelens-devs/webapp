import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getSeoForPath, getOrganizationSchema } from "../src/seo/routeSeo.js";
import { getAllCategorySlugs } from "../src/data/categories.js";
import { getAllProducts } from "../src/data/products.js";
import { generateIntentLandingRoutes } from "../src/data/intentLandingData.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const distDir = path.join(projectRoot, "dist");
const templatePath = path.join(distDir, "index.html");

if (!fs.existsSync(templatePath)) {
  throw new Error("dist/index.html not found. Run vite build first.");
}

const template = fs.readFileSync(templatePath, "utf8");

const staticRoutes = [
  "/",
  "/about-us",
  "/categories",
  "/products",
  "/surveillance",
  "/testimonials",
  "/contact-us",
  "/privacy-policy",
  "/terms-of-use",
  "/terms-of-sales",
  "/terms-and-conditions",
  "/account-deletion",
  "/track-order",
  "/checkout",
  "/checkout-success",
  "/checkout-failure",
  "/view-cart",
  "/sign-in",
  "/signup",
  "/dashboard",
];

const categoryRoutes = getAllCategorySlugs().flatMap((slug) => [
  `/category/${slug}`,
  `/category-products/${slug}`,
]);

const productRoutes = getAllProducts().map((product) => {
  const id = product.id || product.slug;
  return `/product-details/${product.slug}/${id}`;
});

const intentRoutes = generateIntentLandingRoutes();

const routes = [...new Set([...staticRoutes, ...categoryRoutes, ...productRoutes, ...intentRoutes])];

const stripSeoTags = (html) => {
  let output = html;
  output = output.replace(/<title>[\s\S]*?<\/title>/i, "");
  output = output.replace(/<meta\s+name="description"[^>]*>\s*/gi, "");
  output = output.replace(/<meta\s+name="robots"[^>]*>\s*/gi, "");
  output = output.replace(/<meta\s+property="og:[^"]+"[^>]*>\s*/gi, "");
  output = output.replace(/<meta\s+name="twitter:[^"]+"[^>]*>\s*/gi, "");
  output = output.replace(/<link\s+rel="canonical"[^>]*>\s*/gi, "");
  output = output.replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>\s*/gi, "");
  return output;
};

const renderRouteHtml = (baseHtml, route) => {
  const seo = getSeoForPath(route);
  const organizationSchema = getOrganizationSchema();

  const seoBlock = [
    `    <title>${seo.title}</title>`,
    `    <meta name="description" content="${seo.description.replace(/"/g, "&quot;")}" />`,
    `    <meta name="robots" content="${seo.robots || "index, follow"}" />`,
    `    <link rel="canonical" href="${seo.canonical}" />`,
    `    <meta property="og:type" content="${seo.ogType || "website"}" />`,
    `    <meta property="og:site_name" content="Corelens" />`,
    `    <meta property="og:title" content="${seo.title.replace(/"/g, "&quot;")}" />`,
    `    <meta property="og:description" content="${seo.description.replace(/"/g, "&quot;")}" />`,
    `    <meta property="og:url" content="${seo.canonical}" />`,
    `    <meta property="og:image" content="${seo.image}" />`,
    `    <meta property="og:locale" content="en_IN" />`,
    `    <meta name="twitter:card" content="summary_large_image" />`,
    `    <meta name="twitter:title" content="${seo.title.replace(/"/g, "&quot;")}" />`,
    `    <meta name="twitter:description" content="${seo.description.replace(/"/g, "&quot;")}" />`,
    `    <meta name="twitter:image" content="${seo.image}" />`,
    `    <script type="application/ld+json">${JSON.stringify(organizationSchema)}</script>`,
    `    <script type="application/ld+json">${JSON.stringify(seo.schema)}</script>`,
  ].join("\n");

  const cleaned = stripSeoTags(baseHtml);
  return cleaned.replace("</head>", `${seoBlock}\n  </head>`);
};

for (const route of routes) {
  const routeHtml = renderRouteHtml(template, route);

  if (route === "/") {
    fs.writeFileSync(templatePath, routeHtml, "utf8");
    continue;
  }

  const routeDir = path.join(distDir, route.replace(/^\//, ""));
  fs.mkdirSync(routeDir, { recursive: true });
  fs.writeFileSync(path.join(routeDir, "index.html"), routeHtml, "utf8");
}

console.log(`Generated route HTML files for ${routes.length} routes`);
