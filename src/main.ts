import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
// import router from './router'
// import hashRouter from '@/plugins/hash-router'

const app = createApp(App)

app.use(createPinia())
// app.use(router)
// app.use(hashRouter, {})

app.mount('#app')
