<script setup>
import {inject} from 'vue'
import {Home} from 'lucide-vue-next'

const config = inject('config')
const auth = inject('auth')

const handleLogout = () => {
  auth.logout()
  window.location.reload()
}
</script>

<template lang="pug">
nav.main-nav
  div.nav-list
    RouterLink.nav-list-item(to="/", active-class="active")
      Home(:size=18).me-2
      | {{ $t('dashboard') }}

  div(v-for="menu in config.menu" :key="menu.name")
    h6 {{ $t(menu.name) }}
    div.nav-list
      RouterLink.nav-list-item(v-for="link of menu.links", :to="link.to", active-class="active")
        component(:is="link.icon").me-2
        | {{ $t(link.name) }}

  hr

  div.nav-list
    a.nav-list-item(href="/") {{ $t('actions.go_website') }}
    button.nav-list-item.danger(@click="handleLogout") {{ $t('actions.logout') }}
</template>
