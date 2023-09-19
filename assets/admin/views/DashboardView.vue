<script setup>
import { useRouter } from 'vue-router'
import { inject } from 'vue'

const router = useRouter()

const auth = inject('auth')
if (!auth.isAuthenticated()) {
  router.push('login')
}
</script>

<template lang="pug">
h1 Dashboard
</template>
