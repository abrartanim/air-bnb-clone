import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Add the server configuration block
  server: {
    proxy: {
      // Proxy any request starting with /api to your backend server
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },
});
