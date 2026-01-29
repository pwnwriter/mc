import { defineConfig } from "astro/config";

export default defineConfig({
  vite: {
    // Ensure Tone.js works correctly with Vite bundling
    optimizeDeps: {
      include: ["tone"],
    },
  },
});
