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
  host: 'https://palacz.at/analytics/',
  siteId: 5,
  router: router
})

router.isReady().then(() => {
  app.mount('#app')
})
