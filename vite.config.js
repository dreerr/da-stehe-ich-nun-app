import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vitePluginFaviconsInject from 'vite-plugin-favicons-inject'
import ogPlugin from 'vite-plugin-open-graph'

// eslint-disable-next-line no-unused-vars
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [
      vue(),
      vitePluginFaviconsInject('./src/assets/logo.png', {
        appleStartup: false,
        appName: env.VITE_APP_TITLE,
        appDescription: env.VITE_APP_DESCRIPTION,
        developerName: env.VITE_APP_DEV,
        developerURL: env.VITE_APP_DEV_URL,
        lang: env.VITE_APP_LOCALE
      }),
      ogPlugin({
        basic: {
          url: env.VITE_APP_URL,
          title: env.VITE_APP_TITLE,
          image: env.VITE_APP_IMAGE,
          type: 'Website',
          determiner: 'auto',
          description: env.VITE_APP_DESCRIPTION,
          locale: env.VITE_APP_LOCALE,
          siteName: env.VITE_APP_TITLE
        },
        twitter: {
          title: env.VITE_APP_TITLE,
          image: env.VITE_APP_IMAGE,
          description: env.VITE_APP_DESCRIPTION
        }
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
