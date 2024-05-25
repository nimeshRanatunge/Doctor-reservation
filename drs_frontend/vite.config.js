import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),

  ],
  build: {
    // ... other options
    rollupOptions: {
      // ... other options
      external: ['react-router-dom'], // Tell Vite not to bundle React Router DOM
    },
  },
});
