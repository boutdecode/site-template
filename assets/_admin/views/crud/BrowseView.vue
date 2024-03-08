<script setup>
import { defineProps, ref, inject } from "vue"
import { useRouter } from "vue-router"
import Card from "../../components/ui/card/Card.vue"
import CardHeader from "../../components/ui/card/CardHeader.vue"
import CardFooter from "../../components/ui/card/CardFooter.vue"
import TopNavBar from "../../components/default/TopNavBar.vue"
import Breadcrumb from "../../components/ui/breadcrumb/Breadcrumb.vue"
import BreadcrumbItem from "../../components/ui/breadcrumb/BreadcrumbItem.vue"
import Actions from "../../components/crud/Actions.vue"
import Delete from "../../components/crud/Delete.vue"
import Show from "../../components/crud/Show.vue"
import Edit from "../../components/crud/Edit.vue"
import Notification from "../../components/ui/notification/Notification.vue"
import Create from "../../components/crud/Create.vue";

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

const showCreateModal = () => {
  if (actions.create && actions.create.route) {
    router.push({ name: actions.create.route })
  } else {
    emitter.emit('modal:create-item:show')
  }
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
  emitter.emit('notification:edited-item:show')
}

const createItem = item => {
  emitter.emit('notification:created-item:show')
  fetch()
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
    button(@click="showCreateModal()").btn.btn-success {{ $t('actions.create') }}
  div.table-responsive
    component(:is="template", :items="items", :loading="loading", :actions="Actions")
  CardFooter

Delete(v-if="!actions.delete", @success="deleteItem")
Edit(v-if="!actions.edit", @success="editItem", :store="store")
Show(v-if="!actions.show")
Create(v-if="actions.create", :form="actions.create.form" :store="store", @success="createItem")

div.toast-container.position-fixed.top-0.end-0.p-3
  Notification(type="success")#edited-item
    span Item edited successfully

div.toast-container.position-fixed.top-0.end-0.p-3
  Notification(type="success")#created-item
    span Item created successfully
</template>
