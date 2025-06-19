import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index'

createApp(App)
  .use(createPinia())
  .use(router)
  .mount('#app')
