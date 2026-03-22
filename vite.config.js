import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 4001,
    open: true
  },
  build: {
    outDir: 'dist'
  }
});
