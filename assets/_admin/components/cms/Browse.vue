<script setup>
import { Loader } from "lucide-vue-next"
import { defineProps } from "vue"
import YesNo from "../../components/ui/badge/YesNo.vue"

const { items } = defineProps({
  items: Array,
  loading: Boolean,
  actions: Function
})
</script>

<template lang="pug">
Loader(v-if="loading")
table(v-if="!loading").table-content
  thead
    tr
      th #
      th {{ $t('slug') }}
      th {{ $t('title') }}
      th {{ $t('activated') }}
      th {{ $t('edited_at') }}
      th {{ $t('created_at') }}
      th {{ $t('actions') }}
  tbody
    tr(v-for="item in items" :key="item.id")
      td {{ item._id }}
      td {{ item.slug }}
      td {{ item.title }}
      td
        YesNo(:bool="item.activated")
      td
        span(v-date="{ hour: 'numeric', minute: 'numeric' }") {{ item.editedAt }}
      td
        span(v-date) {{ item.createdAt }}
      td
        component(:is="actions", :item="item")
</template>
