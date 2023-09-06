import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vitePluginFaviconsInject from 'vite-plugin-favicons-inject'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vitePluginFaviconsInject('./src/assets/logo.png')],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
