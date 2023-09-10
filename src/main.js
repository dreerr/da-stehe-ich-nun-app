import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import VueMatomo from 'vue-matomo'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.use(VueMatomo, {
  host: import.meta.env.VITE_MATOMO_URL,
  siteId: parseInt(import.meta.env.VITE_MATOMO_ID),
  router: router
})

router.isReady().then(() => {
  app.mount('#app')
})
