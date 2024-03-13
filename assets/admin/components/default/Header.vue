<script setup>
import {UserCircle} from 'lucide-vue-next'
import {inject} from 'vue'
import {LayoutDashboard} from 'lucide-vue-next'

const auth = inject('auth')
</script>

<template lang="pug">
header.main-header.d-flex.justify-content-between.align-items-center
  RouterLink(:to="{ name: 'home' }").navbar-brand
    LayoutDashboard.me-2
    | Admin Panel

  button.btn.btn-light
    UserCircle.me-1(size="16")
    | {{ auth.token.sub }}
</template>
