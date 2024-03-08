<script setup>
import TopNavBar from "../components/default/TopNavBar.vue";
import Breadcrumb from "../components/ui/breadcrumb/Breadcrumb.vue";
import BreadcrumbItem from "../components/ui/breadcrumb/BreadcrumbItem.vue";
</script>

<template lang="pug">
TopNavBar
  Breadcrumb
    BreadcrumbItem {{ $t('admin') }}
    BreadcrumbItem.active {{ $t('dashboard') }}

section.container-fluid
  h2.mb-4 {{ $t('hello_world') }}

  div.row
</template>
