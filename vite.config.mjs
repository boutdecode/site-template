import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  root: './assets',
  plugins: [],
  publicDir: './statics',
  build: {
    rollupOptions: {
      input: {
        main: './assets/main.js',
      },
    },
    manifest: true,
    outDir: './../public',
    assetsDir: './build',
  },
})
