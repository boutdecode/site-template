import dotenv from 'dotenv'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

dotenv.config()

export default ({ mode }) => {
  const env = process.env.APP_ENV || mode

  loadEnv(env, process.cwd())

  return defineConfig({
    root: './assets',
    mode: env,
    plugins: [vue()],
    publicDir: './statics',
    build: {
      rollupOptions: {
        input: {
          main: './assets/main.js',
          admin: './assets/admin/main.js',
          front: './assets/front/main.js',
        },
        output: env !== 'production' ? {
          entryFileNames: `build/[name].js`,
          chunkFileNames: `build/[name].js`,
          assetFileNames: `build/[name].[ext]`
        } : {},
      },
      sourcemap: env !== 'production',
      manifest: true,
      outDir: './../public',
      assetsDir: './build',
    },
    resolve: {
      alias: {
        '@admin': fileURLToPath(new URL('./assets/admin', import.meta.url)),
        '@front': fileURLToPath(new URL('./assets/front', import.meta.url))
      }
    }
  })
}
