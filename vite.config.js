import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   port: 3000, // Change this to any port you want
  // },
  resolve: {
    alias: {
      Components: "/src/Components",
      Pages: "/src/Pages",
      Assets: "/src/Assets",
      Layouts: "/src/Layouts",
      Redux: "/src/Redux",
      Configs: "/src/Configs",
      Helpers: "/src/Helpers",
      Routes: "/src/Routes",
      Constants: "/src/Constants"
    }
  },
});
