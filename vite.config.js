import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'public/index.html'),
        admin: resolve(__dirname, 'public/admin.html'),
        'admin-login': resolve(__dirname, 'public/admin-login.html'),
        sostituzioni: resolve(__dirname, 'public/sostituzioni.html'),
        playlist: resolve(__dirname, 'public/playlist.html'),
        dm65: resolve(__dirname, 'public/dm65.html'),
        dm66: resolve(__dirname, 'public/dm66.html'),
        dm19: resolve(__dirname, 'public/dm19.html'),
        'pnrr-labs': resolve(__dirname, 'public/pnrr-labs.html'),
        'pnrr-classroom': resolve(__dirname, 'public/pnrr-classroom.html'),
        'calendario-impegni': resolve(__dirname, 'public/calendario-impegni.html'),
        organigramma: resolve(__dirname, 'public/organigramma.html')
      }
    }
  },
  publicDir: 'public',
  server: {
    port: 3000,
    open: true
  }
}); 