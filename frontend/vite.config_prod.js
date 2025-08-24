// production

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }],
        ],
      },
    }),
    tailwindcss(),
  ],
  build: {
    outDir: 'dist',         // default output folder
    emptyOutDir: true,      // clear old build
    chunkSizeWarningLimit: 1600, // optional: avoid warnings for large chunks
  },
});
