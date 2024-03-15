import '@admin/assets/sass/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import mitt from 'mitt'

import App from '@admin/App.vue'
import config from '@admin/config/config'
import router from '@admin/lib/router'
import i18n from '@admin/lib/i18n'
import Requester from '@admin/lib/requester'
import Auth from '@admin/lib/auth'

import dateDirective from '@admin/directives/date'
import tooltipDirective from '@admin/directives/tooltip'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.provide('emitter', mitt())

app.directive('date', dateDirective)
app.directive('tooltip', tooltipDirective)

const auth = new Auth('app')
app.provide('requester', new Requester('/api', auth))
app.provide('auth', auth)
app.provide('config', config)

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded')
  app.mount('#app')
})
