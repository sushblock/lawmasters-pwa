import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      srcDir: "src",
      filename: "sw.js", // our SW file
      strategies: "injectManifest",
      // includeAssets: added icons + offline.html
      includeAssets: [
        "offline.html",
        "icons/favicon-16.png",
        "icons/favicon-32.png",
        "icons/favicon-48.png",
        "icons/icon-180.png",
        "icons/icon-192.png",
        "icons/icon-256.png",
        "icons/icon-384.png",
        "icons/icon-512.png",
        "icons/maskable-512.png",
        "icons/favicon.svg",
      ],
      manifest: false, // we already provide /public/manifest.webmanifest
    }),
  ],
});
// https://vitejs.dev/config/
