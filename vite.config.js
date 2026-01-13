import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    rollupOptions: {
      input: {
        main: "./index.html",
      },
      output: {
        manualChunks: undefined,
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split(".");
          const ext = info[info.length - 1];
          if (/\.(css)$/.test(assetInfo.name)) {
            return `assets/css/[name]-[hash].${ext}`;
          }
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name)) {
            return `assets/images/[name]-[hash].${ext}`;
          }
          return `assets/[name]-[hash].${ext}`;
        },
      },
      onwarn(warning, warn) {
        // Ignore CSS warnings during build
        if (warning.code === "CSS_SYNTAX_ERROR") return;
        warn(warning);
      },
    },
    cssCodeSplit: false,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: false,
        drop_debugger: false,
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  server: {
    host: "0.0.0.0",
    port: 5000,
    allowedHosts: [
      "all",
      ".repl.co",
      ".replit.dev",
      "21a6c0d8-e885-4623-9a98-65d8bac51203-00-1l2cut7y7alar.pike.repl.co"
    ],
    strictPort: true,
    hmr: {
      port: 5000,
      host: "0.0.0.0",
    },
    origin: "https://" + process.env.REPLIT_DEV_DOMAIN,
    proxy: {
      "/api": {
        target: "https://backend.corelens.in",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path,
      },
    },
  },
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.[jt]sx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
    },
  },
});
