import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Add these babel configurations for better compatibility
      babel: {
        plugins: [
          ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }],
        ],
      },
    }),
    tailwindcss(),
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
      },
    },
    build: {
      // Add these build optimizations
      chunkSizeWarningLimit: 1600,
      emptyOutDir: true,
    },
})


// production

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import tailwindcss from '@tailwindcss/vite';

// export default defineConfig({
//   plugins: [
//     react({
//       babel: {
//         plugins: [
//           ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }],
//         ],
//       },
//     }),
//     tailwindcss(),
//   ],
//   build: {
//     outDir: 'dist',         // default output folder
//     emptyOutDir: true,      // clear old build
//     chunkSizeWarningLimit: 1600, // optional: avoid warnings for large chunks
//   },
// });
