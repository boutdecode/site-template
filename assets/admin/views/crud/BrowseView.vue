<script setup>
import { defineProps, ref } from "vue"
import Card from "@admin/components/ui/card/Card.vue"
import CardHeader from "@admin/components/ui/card/CardHeader.vue"
import CardFooter from "@admin/components/ui/card/CardFooter.vue"
import TopNavBar from "@admin/components/default/TopNavBar.vue"
import Breadcrumb from "@admin/components/ui/breadcrumb/Breadcrumb.vue"
import BreadcrumbItem from "@admin/components/ui/breadcrumb/BreadcrumbItem.vue"
import Actions from "@admin/components/crud/Actions.vue"
import Delete from "@admin/components/crud/Delete.vue";

const { store, template, title } = defineProps({
  store: [Object, Function],
  template: [String, Function],
  title: { type: String, default: "browse" },
})

const { find, remove } = store()
const items = ref([])
const loading = ref(true)

const fetch = () => {
  find()
      .then((data) => {
        items.value = data
        loading.value = false
      })
}

const deleteItem = item => {
  remove(item)
      .then(() => fetch())
}

fetch()
</script>

<template lang="pug">
TopNavBar
  Breadcrumb
    BreadcrumbItem {{ $t('admin') }}
    BreadcrumbItem.active {{ $t(title) }}

Card.shadow-sm.m-4
  CardHeader
    h5.mb-0 {{ $t(title) }}
  div.table-responsive
    component(:is="template", :items="items", :loading="loading", :actions="Actions")
  CardFooter

Delete(@success="deleteItem")
</template>
