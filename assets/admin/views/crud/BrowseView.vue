<script setup>
import { defineProps, ref, inject } from "vue"
import { useRouter } from "vue-router"
import Card from "@admin/components/ui/card/Card.vue"
import CardHeader from "@admin/components/ui/card/CardHeader.vue"
import CardFooter from "@admin/components/ui/card/CardFooter.vue"
import TopNavBar from "@admin/components/default/TopNavBar.vue"
import Breadcrumb from "@admin/components/ui/breadcrumb/Breadcrumb.vue"
import BreadcrumbItem from "@admin/components/ui/breadcrumb/BreadcrumbItem.vue"
import Actions from "@admin/components/crud/Actions.vue"
import Delete from "@admin/components/crud/Delete.vue";
import Show from "@admin/components/crud/Show.vue";
import Edit from "@admin/components/crud/Edit.vue";
import Notification from "@admin/components/ui/notification/Notification.vue";

const router = useRouter()
const emitter = inject('emitter')
const { store, template, title, actions } = defineProps({
  store: [Object, Function],
  template: [String, Function],
  title: { type: String, default: "browse" },
  actions: { type: Object, default: {} },
})

const { find, remove, edit } = store()
const items = ref([])
const loading = ref(true)

const fetch = () => {
  find()
      .then((data) => {
        items.value = data
        loading.value = false
      })
}

const showDeleteModal = item => {
  if (actions.delete) {
    router.push({ name: actions.delete.route, params: { id: item._id } })
  } else {
    emitter.emit('modal:delete-item:show', item)
  }
}

const showShowModal = item => {
  if (actions.show) {
    router.push({ name: actions.show.route, params: { id: item._id } })
  } else {
    emitter.emit('modal:show-item:show', item)
  }
}

const showEditModal = item => {
  if (actions.edit) {
    router.push({ name: actions.edit.route, params: { id: item._id } })
  } else {
    emitter.emit('modal:edit-item:show', item)
  }
}

const deleteItem = item => {
  remove(item)
    .then(() => fetch())
}

const editItem = item => {
  //edit(item)
  emitter.emit('notification:edited-item:show')
}

emitter.on('action:edit-item', showEditModal)
emitter.on('action:show-item', showShowModal)
emitter.on('action:delete-item', showDeleteModal)
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

Delete(v-if="!actions.delete", @success="deleteItem")
Edit(v-if="!actions.edit", @success="editItem", :store="store")
Show(v-if="!actions.show")

div.toast-container.position-fixed.top-0.end-0.p-3
  Notification(type="success")#edited-item
    span Item edited successfully
</template>
