<script setup>
import { LayoutDashboard } from 'lucide-vue-next'
</script>

<template lang="pug">
header.main-header
  a(href="/admin").navbar-brand
    LayoutDashboard.me-2
    | Admin Panel
</template>
