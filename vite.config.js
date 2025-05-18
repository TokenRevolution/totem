import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: 'index.html',
        admin: 'admin.html',
        'admin-login': 'admin-login.html',
        sostituzioni: 'sostituzioni.html',
        playlist: 'playlist.html',
        dm65: 'dm65.html',
        dm66: 'dm66.html',
        dm19: 'dm19.html',
        'pnrr-labs': 'pnrr-labs.html',
        'pnrr-classroom': 'pnrr-classroom.html',
        'calendario-impegni': 'calendario-impegni.html',
        organigramma: 'organigramma.html'
      }
    }
  },
  publicDir: 'public',
  server: {
    port: 3000,
    open: true
  }
}); 