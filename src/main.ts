import './assets/main.scss'

import { createApp, ref } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import { sectionTitle } from './utils/section.utils'

createApp(App)
  .use(createPinia())
  .use(router)
  .mount('#app')
