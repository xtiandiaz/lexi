import './assets/main.scss'

import { createApp, ref } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import { sectionTitle } from './utils/section.utils'

const app = createApp(App)
  .use(createPinia())
  
router.getRoutes().forEach(r => {
  r.meta.title = ref(sectionTitle(r.meta.section))
})

app
  .use(router)
  .mount('#app')
