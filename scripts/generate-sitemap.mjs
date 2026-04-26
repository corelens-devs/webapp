import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getAllCategorySlugs } from "../src/data/categories.js";
import { getAllProducts } from "../src/data/products.js";
import { generateIntentLandingRoutes } from "../src/data/intentLandingData.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const BASE_URL = "https://www.corelens.in";
const today = new Date().toISOString().slice(0, 10);

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

const urls = [...new Set([...staticRoutes, ...categoryRoutes, ...productRoutes, ...intentRoutes])];

const urlEntries = urls
  .map((route) => {
    const priority = route === "/" ? "1.0" : route.startsWith("/product-details/") ? "0.8" : "0.7";
    const changeFreq = route === "/" ? "daily" : route.startsWith("/product-details/") ? "weekly" : "monthly";

    return `  <url>\n    <loc>${BASE_URL}${route}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changeFreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
  })
  .join("\n\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n\n${urlEntries}\n\n</urlset>\n`;

const publicSitemap = path.join(projectRoot, "public", "sitemap.xml");
fs.writeFileSync(publicSitemap, xml, "utf8");

const distSitemap = path.join(projectRoot, "dist", "sitemap.xml");
if (fs.existsSync(path.dirname(distSitemap))) {
  fs.writeFileSync(distSitemap, xml, "utf8");
}

console.log(`Sitemap generated with ${urls.length} URLs`);
