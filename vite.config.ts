import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/lexi/' : '/',
  root: 'src',
  publicDir: '../public',
  plugins: [
    vue()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@design-tokens': fileURLToPath(new URL('./src/assets/design-tokens', import.meta.url)),
      '@vueties': fileURLToPath(new URL('./src/vueties', import.meta.url))
    },
    preserveSymlinks: true
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  }
})
