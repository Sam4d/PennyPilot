import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "prompt",
      includeAssets: ["icon.svg", "icon-192.png", "icon-512.png"],
      manifest: {
        name: "Penny Pilot",
        short_name: "Penny Pilot",
        description:
          "मिया के साथ पैसों की समझ। रोज़ एक छोटा lesson, आसान हिन्दी में।",
        theme_color: "#69bd45",
        background_color: "#f9faf7",
        display: "standalone",
        start_url: "/",
        icons: [
          { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
          {
            src: "/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,woff2}"],
        maximumFileSizeToCacheInBytes: 4000000,
      },
    }),
  ],
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: "react",
              test: /[\/]node_modules[\/](react|react-dom|scheduler)[\/]/,
            },
            { name: "storage", test: /[\/]node_modules[\/]dexie[\/]/ },
            {
              name: "lessons",
              test: /[\/]src[\/]content[\/](schema|lessons|everyday|protection|borrowing)\.ts$/,
            },
          ],
        },
      },
    },
  },
  test: { include: ["tests/**/*.test.ts"] },
});
