import './assets/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'

const app = createApp(App)
  .use(createPinia())
  .use(router)
  
await router.isReady()

app.mount('#app')
