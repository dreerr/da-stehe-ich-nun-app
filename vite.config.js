import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vitePluginFaviconsInject from 'vite-plugin-favicons-inject'
import ogPlugin from 'vite-plugin-open-graph'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vitePluginFaviconsInject('./src/assets/logo.png', {
      appName: 'Da stehe ich nun...',
      appDescription:
        'Die geballte Präsenz eines unermüdlichen Detektivs, dessen Monolog sich wie ein spannungsgeladener Krimi durch die Straßen und Plätze von Wien windet',
      developerName: 'Julian Palacz',
      developerURL: 'https://julian.palacz.at',
      lang: 'de-AT'
    }),
    ogPlugin({
      basic: {
        url: 'https://da-stehe-ich-nun.palacz.at',
        title: 'Da stehe ich nun...',
        image: 'https://da-stehe-ich-nun.palacz.at/website.jpg',
        type: 'Website',
        determiner: 'auto',
        description:
          'Die geballte Präsenz eines unermüdlichen Detektivs, dessen Monolog sich wie ein spannungsgeladener Krimi durch die Straßen und Plätze von Wien windet',
        locale: 'de_AT',
        siteName: 'Da stehe ich nun...'
      },
      twitter: {
        title: 'Da stehe ich nun...',
        image: 'https://da-stehe-ich-nun.palacz.at/website.jpg',
        description:
          'Die geballte Präsenz eines unermüdlichen Detektivs, dessen Monolog sich wie ein spannungsgeladener Krimi durch die Straßen und Plätze von Wien windet'
      }
    })
  ],
  assetsInclude: ['@/assets/hero.jpg'],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
