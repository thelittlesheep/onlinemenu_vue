import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
const path = require('path');
export default defineConfig({
  plugins: [vue()],
  define: {
    'process.env': {},
    'process.env.BASE_URL': '"/"'
  },
  server: {
    cors: true,
    host: '0.0.0.0',
    port: 3001
    // proxy: {
    // "/backend": {
    //   target: "http://localhost:3000",
    //   changeOrigin: true,
    //   rewrite: (path) => path.replace(/^\/backend/, "")
    // }
    // "/api": {
    //   target: "https://backend.lshuang.tw/",
    //   changeOrigin: true,
    //   rewrite: (path) => path.replace(/^\/backend/, "")
    // }
    // }
  },
  base: './',
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
