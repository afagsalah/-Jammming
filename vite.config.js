import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  base: "/-Jammming/",

  test: {
    environment: "jsdom",
    setupFiles: "./src/testSetup.js",
    globals: true,
  },
});
