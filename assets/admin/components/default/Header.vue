<script setup>
import {Coffee, UserCircle} from 'lucide-vue-next'
import {inject} from 'vue'

const auth = inject('auth')
</script>

<template lang="pug">
header.main-header.d-flex.justify-content-between.align-items-center
  RouterLink(:to="{ name: 'home' }").navbar-brand
    Coffee.me-2
    | Admin Panel

  button.btn.btn-light
    UserCircle.me-1(size="16")
    | {{ auth.token.sub }}
</template>
