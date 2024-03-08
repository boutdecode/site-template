<script setup>
import { inject } from "vue"
import { LayoutDashboard, Home } from "lucide-vue-next"
import Sidebar from "../../components/ui/sidebar/Sidebar.vue"
import SidebarBrand from "../../components/ui/sidebar/SidebarBrand.vue"
import SidebarNav from "../../components/ui/sidebar/SidebarNav.vue"
import SidebarAction from "../../components/ui/sidebar/SidebarAction.vue"
import SidebarTitle from "../../components/ui/sidebar/SidebarTitle.vue"
import SidebarFooter from "../../components/ui/sidebar/SidebarFooter.vue";

const { menu, application } = inject('config')
const auth = inject('auth')
</script>

<template lang="pug">
Sidebar.sidebar-lg-collapse
  SidebarBrand
    LayoutDashboard
    span.sidebar-content {{ $t('brand_name') }}

  SidebarNav
    SidebarAction(to="/")
      Home(size="16px")
      span.sidebar-content {{ $t('home') }}

  div(v-for="node in menu")
    SidebarTitle(h="5")
      | {{ $t(node.name) }}

    SidebarNav(v-for="link in node.links")
      SidebarAction(:to="link.url")
        component(:is="link.icon", size="16px")
        span.sidebar-content {{ $t(link.name) }}

  SidebarFooter
    hr
    SidebarNav
      a(href="/").btn.btn-outline-primary.text-center {{ $t('actions.go_website') }}
      button(@click="auth.logout").btn.btn-outline-danger.text-center {{ $t('actions.logout') }}

    | v{{ application.version }} [{{ application.env }}]
</template>
