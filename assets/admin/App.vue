<script setup>
import {useRouter} from 'vue-router'
import {inject} from 'vue'

import Header from '@admin/components/default/Header.vue'
import Nav from '@admin/components/default/Nav.vue'
import Notification from '@admin/components/ui/notification/Notification.vue'
import Login from '@admin/components/default/Login.vue'

const router = useRouter()
const auth = inject('auth')
</script>

<template lang="pug">
div.wrapper-body(v-if="auth.isAuthenticated()")
  Header

  section.wrapper-content
    div.wrapper-nav
      Nav
    div.wrapper-main
      main
        RouterView

  div.toast-container.position-fixed.top-0.end-0.p-3
    Notification(type="success")#edited-item
      span {{ $t('notifications.resource_saved') }}

  div.toast-container.position-fixed.top-0.end-0.p-3
    Notification(type="success")#created-item
      span {{ $t('notifications.resource_created') }}

  div.toast-container.position-fixed.top-0.end-0.p-3
    Notification(type="success")#deleted-item
      span {{ $t('notifications.resource_deleted') }}

  div.toast-container.position-fixed.top-0.end-0.p-3
    Notification(type="danger" title="notifications.error_occurred")#error-occurred

Login(v-if="!auth.isAuthenticated()")
</template>
