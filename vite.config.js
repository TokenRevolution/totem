import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'admin.html'),
        'admin-login': resolve(__dirname, 'admin-login.html'),
        playlist: resolve(__dirname, 'playlist.html'),
        dm65: resolve(__dirname, 'dm65.html'),
        dm66: resolve(__dirname, 'dm66.html'),
        dm19: resolve(__dirname, 'dm19.html'),
        'pnrr-labs': resolve(__dirname, 'pnrr-labs.html'),
        'pnrr-classroom': resolve(__dirname, 'pnrr-classroom.html'),
        sostituzioni: resolve(__dirname, 'sostituzioni.html'),
        'calendario-impegni': resolve(__dirname, 'calendario-impegni.html'),
        organigramma: resolve(__dirname, 'organigramma.html')
      }
    }
  }
}); 