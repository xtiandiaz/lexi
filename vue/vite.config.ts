import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  base: "/lexi/vue/dist",
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@design-tokens': fileURLToPath(new URL('./src/assets/design-tokens', import.meta.url)),
      '@vueties': fileURLToPath(new URL('./src/vueties', import.meta.url))
    },
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.names && assetInfo.names.find(name => /\.woff2$/.test(name))) {
            return 'assets/fonts/[name].[ext]'
          }
          return 'assets/[name]-[hash].[ext]'
        }
      }
    }  
  }
})
