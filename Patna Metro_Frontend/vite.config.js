// ORIGIANL VITE
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import svgr from 'vite-plugin-svgr'; 

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
}); 


// AWS PROXY ROUTE HTTP TO HANDLE BROWSER
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: '0.0.0.0',
//     port: 5173,
//     proxy: {
//       '/api': {
//         target: 'http://patna-metro-b.ap-south-1.elasticbeanstalk.com',
//         changeOrigin: true,
//         secure: false, // Required for proxying to HTTP target
//         rewrite: (path) => path.replace(/^\/api/, '')
//       }
//     }
//   },
// });