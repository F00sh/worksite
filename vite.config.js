// vite.config.js
import { defineConfig } from 'vite';
import tailwind from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwind()],

  // Development server settings
  server: {
    port: 5173,
    open: true,
  },

  // Production build settings
  build: {
    target: 'esnext',
    outDir: 'dist',
    emptyOutDir: true,
  },
});
