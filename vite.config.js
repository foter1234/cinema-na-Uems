import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({

  root: 'src', 
  build: {
    outDir: '../dist', 
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', 
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), 
    },
  },
});
