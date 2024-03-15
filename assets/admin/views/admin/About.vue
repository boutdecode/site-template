<script setup>
import {Bug} from 'lucide-vue-next'
import {inject, onMounted, ref} from 'vue'
import showdown from 'showdown'

import Breadcrumb from '@admin/components/ui/breadcrumb/Breadcrumb.vue'
import BreadcrumbItem from '@admin/components/ui/breadcrumb/BreadcrumbItem.vue'

const config = inject('config')
const changelog = ref('')

onMounted(async () => {
  const converter = new showdown.Converter()
  const response = await fetch('/admin/changelog')
  changelog.value = converter.makeHtml(await response.text())
})
</script>

<template lang="pug">
Breadcrumb.mb-3
  BreadcrumbItem(:to="{ name: 'home' }") {{ $t('dashboard') }}
  BreadcrumbItem.active {{ $t('about') }}

h1.h2 {{ $t('about') }}
p
  | {{ $t('actual_version') }} :
  span.badge.bg-primary.me-2.ms-1 {{ config.application.version }}
  a(:href="config.application.issue" v-if="config.application.issue" target="_blank")
    Bug.me-1(size="16")
    | {{ $t('create_issue') }}

h2 {{ $t('changelog') }}
hr
p(v-html="changelog")
</template>
