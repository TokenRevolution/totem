import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'public/index.html'),
        admin: resolve(__dirname, 'public/admin.html'),
        playlist: resolve(__dirname, 'public/playlist.html'),
        vialuini: resolve(__dirname, 'public/vialuini.html'),
        viasansovino: resolve(__dirname, 'public/viasansovino.html')
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
}); 