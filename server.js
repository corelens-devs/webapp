import compression from "compression";
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import prerender from "prerender-node";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

const DIST_DIR = path.join(__dirname, "dist");
const PORT = Number(process.env.PORT || 4173);
const SITE_URL = process.env.SITE_URL || "https://www.corelens.in";

if (process.env.PRERENDER_TOKEN) {
  prerender.set("prerenderToken", process.env.PRERENDER_TOKEN);
}

if (process.env.PRERENDER_SERVICE_URL) {
  prerender.set("prerenderServiceUrl", process.env.PRERENDER_SERVICE_URL);
}

prerender.set("protocol", "https");
prerender.set("host", new URL(SITE_URL).host);

app.use(compression());
app.use(prerender);

app.use((req, res, next) => {
  const legacyRedirects = {
    "/contact/account-deletion": "/account-deletion",
    "/our-privacy-policy": "/privacy-policy",
  };

  if (legacyRedirects[req.path]) {
    return res.redirect(301, legacyRedirects[req.path]);
  }

  return next();
});

app.use(
  express.static(DIST_DIR, {
    redirect: false,
    maxAge: "7d",
    etag: true,
    setHeaders: (res, filePath) => {
      if (filePath.includes(`${path.sep}assets${path.sep}`)) {
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      }
    },
  }),
);

app.get("*", (req, res) => {
  if (!req.path.includes(".")) {
    const cleanPath = req.path.replace(/\/+$/, "");
    const asRouteFile = path.join(DIST_DIR, cleanPath.replace(/^\//, ""), "index.html");

    if (fs.existsSync(asRouteFile)) {
      return res.sendFile(asRouteFile);
    }
  }

  return res.sendFile(path.join(DIST_DIR, "index.html"));
});

app.listen(PORT, () => {
  console.log(`SEO server running on port ${PORT}`);
});
