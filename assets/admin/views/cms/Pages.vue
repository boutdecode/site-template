<script setup>
import {useRoute} from 'vue-router'
import {ref, inject} from 'vue'

import useStore from '@admin/stores/pages'

import {Trash, Pencil, Search, Plus} from 'lucide-vue-next'
import YesNo from '@admin/components/ui/badge/YesNo.vue'
import Button from '@admin/components/ui/elements/Button.vue'
import ButtonLink from '@admin/components/ui/elements/ButtonLink.vue'
import Pagination from '@admin/components/ui/pagination/Pagination.vue'
import Breadcrumb from '@admin/components/ui/breadcrumb/Breadcrumb.vue'
import BreadcrumbItem from '@admin/components/ui/breadcrumb/BreadcrumbItem.vue'
import Delete from '@admin/components/crud/Delete.vue'

const config = inject('config')
const emitter = inject('emitter')
const route = useRoute()

const {find, remove} = useStore()
const items = ref([])
const loading = ref(true)
const pagination = ref({
  page: parseInt(route?.query?.page || 1),
  limit: parseInt(route?.query?.limit || 10),
  total: 0
})

const fetchItems = (search = {}) => {
  find({ page: pagination.value.page, limit: pagination.value.limit, ...search })
    .then((data) => {
      items.value = data.items
      pagination.value = data.pagination
      loading.value = false
    })
}

const previous = () => {
  pagination.value.page = pagination.value.page - 1
  fetchItems()
}

const next = () => {
  pagination.value.page = pagination.value.page + 1
  fetchItems()
}

const handleSearch = (event) => {
  const { search, locale } = event.target.elements
  fetchItems({search: search.value, locale: locale.value})
}

const handleDelete = async (item) => {
  await remove(item)
  fetchItems()
  emitter.emit('notification:deleted-item:show')
}

fetchItems()
</script>

<template lang="pug">
ButtonLink.float-end(:to="{ name: 'cms.pages.create' }")
  Plus(size="16").me-1
  | {{ $t('actions.create') }}

Breadcrumb.mb-3
  BreadcrumbItem(:to="{ name: 'home' }") {{ $t('dashboard') }}
  BreadcrumbItem.active {{ $t('pages') }}

h1.h2 {{ $t('pages') }}
header.mb-3
  form(@submit.prevent="handleSearch")
    div.d-flex
      div.form-floating
        select#locale.form-select.rounded-end-0(name="locale")
          option(v-for="locale in config.translation.locales" :value="locale" :key="locale" :selected="locale === config.translation.locale") {{ $t(locale) }}
        label(for="locale") {{ $t('locale') }}

      div.form-floating.flex-grow-1
        input#search.form-control.rounded-0(type="text", :placeholder="$t('actions.search')", name="search")
        label(for="search") {{ $t('actions.search') }}

      div.form-floating
        select#limit.form-select.rounded-0(v-model="pagination.limit")
          option(value="10") 10
          option(value="25") 25
          option(value="50") 50
          option(value="100") 100
        label(for="limit") {{ $t('limit') }}

      Button.rounded-start-0(type="submit" level="primary" outline)
        Search(size="16").me-1
        | {{ $t('actions.search') }}

table.table.table-hover.align-middle.border.rounded
  thead
    tr.table-light
      th {{ $t('slug') }}
      th {{ $t('title') }}
      th {{ $t('description') }}
      th {{ $t('enabled') }}
      th {{ $t('factory') }}
      th {{ $t('created_at') }}
      th {{ $t('edited_at') }}
      th {{ $t('actions.actions') }}
  tbody
    tr(v-for="item in items" :key="item.id")
      td {{ item.slug }}
      td
        span(v-for="(value, locale) in item.title")
          span.text-muted.me-1 {{ locale }}:
          span {{ value }}
          br
      td
        span(v-for="(value, locale) in item.description")
          span.text-muted.me-1 {{ locale }}:
          span {{ value.substring(0, 30) }}
          br
      td
        YesNo(:bool="item.enabled")
      td
        YesNo(:bool="item.factory")
      td
        span(v-date) {{ item.createdAt }}
      td
        span(v-date="{ hour: 'numeric', minute: 'numeric' }") {{ item.editedAt }}
      td
        div.btn-group
          ButtonLink(:to="{ name: 'cms.pages.edit', params: { id: item._id } }")
            Pencil(size="16").me-1
            | {{ $t('actions.edit') }}
          Button(level="danger" @click="emitter.emit('modal:delete-item:show', item)")
            Trash(size="16").me-1
            | {{ $t('actions.delete') }}

Pagination(:pagination="pagination" @previous="previous" @next="next")
Delete(@success="handleDelete")
</template>
