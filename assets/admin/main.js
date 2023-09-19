import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import i18n from './lib/i18n'
import Requester from './lib/requester'
import Auth from './lib/auth'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

const auth = new Auth('app')
app.provide('requester', new Requester('/api', auth))
app.provide('auth', auth)

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded')
  app.mount('#app')
})
