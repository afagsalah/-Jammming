import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
  const isNetlify = process.env.NETLIFY === "true";

  return {
    plugins: [react()],

    base: isNetlify ? "/" : "/-Jammming/",

    test: {
      environment: "jsdom",
      setupFiles: "./src/testSetup.js",
      globals: true,
    },
  };
});
