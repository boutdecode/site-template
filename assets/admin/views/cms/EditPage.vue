<script setup>
import {useRoute, useRouter} from 'vue-router'
import {Save, ArrowLeft} from 'lucide-vue-next'
import {ref, inject, onMounted, computed} from 'vue'
import useStore from './../../stores/pages'
import Breadcrumb from '@admin/components/ui/breadcrumb/Breadcrumb.vue'
import BreadcrumbItem from '@admin/components/ui/breadcrumb/BreadcrumbItem.vue'
import Button from '@admin/components/ui/elements/Button.vue'
import ButtonLink from '@admin/components/ui/elements/ButtonLink.vue'

const {edit, create} = useStore()
const config = inject('config')
const emitter = inject('emitter')
const item = ref({
  slug: null,
  title: {},
  description: {},
  content: {},
  published: false,
  factory: false
})
const route = useRoute()
const router = useRouter()

onMounted(async () => {
  if (route.params.id) {
    fetchItem(route.params.id)
  }
})

const fetchItem = async (id) => {
  const response = await fetch(`/api/pages/${id}`)
  item.value = await response.json()
}

const handleSubmit = async () => {
  if (item.value._id) {
    await edit(item.value)
    emitter.emit('notification:edited-item:show')
  } else {
    await create(item.value)
    await router.push({ name: 'cms.pages.index' })
    emitter.emit('notification:created-item:show')
  }
}

const mode = computed(() => item.value._id ? 'edit' : 'create')
</script>

<template lang="pug">
Breadcrumb.mb-3
  BreadcrumbItem(:to="{ name: 'home' }") {{ $t('dashboard') }}
  BreadcrumbItem(:to="{ name: 'cms.pages.index' }") {{ $t('pages') }}
  BreadcrumbItem.active {{ $t(`${mode}_resource`) }}

h1.h2 {{ $t(`${mode}_resource`) }}
form(@submit.prevent="handleSubmit")
  div.mb-4
    label(for="slug") {{ $t('form.label.slug') }}
    input#slug.form-control(type="text" name="slug" v-model="item.slug" :readonly="mode === 'edit'" :disabled="mode === 'edit'" required)
    div.form-text {{ $t('form.help.slug') }}

  div.mb-4
    ul.nav.nav-tabs.mb-3(role="tablist")
      li.nav-item(v-for="locale in config.translation.locales")
        button.nav-link(:class="{ 'active': locale === config.translation.locale }" type="button" role="tab" :key="locale" :data-bs-target="'#' + locale + '-pan'" data-bs-toggle="tab") {{ $t(locale) }}

    div.tab-content
      div.tab-pane.fade(v-for="locale in config.translation.locales" role="tabpanel" :id="locale + '-pan'" :key="locale" :class="{ 'show active': locale === config.translation.locale }")
        div.mb-3
          label(for="title") {{ $t('form.label.title') }}
          input#title.form-control(type="text" name="title" v-model="item.title[locale]" required)

        div.mb-3
          label(for="description") {{ $t('form.label.description') }}
          textarea#description.form-control(name="description" v-model="item.description[locale]" required)

        div.mb-3
          label(for="content") {{ $t('form.label.content') }}
          textarea#content.form-control(name="content" v-model="item.content[locale]" required)

  div.mb-4.form-check.form-switch
    input#published.form-check-input(type="checkbox" name="published" v-model="item.published")
    label.form-check-label(for="published") {{ $t('form.label.published') }}
    div.form-text {{ $t('form.help.published') }}

  div.mb-4.form-check.form-switch(v-if="mode === 'create'")
    input#isFactory.form-check-input(type="checkbox" name="factory" v-model="item.factory")
    label.form-check-label(for="factory") {{ $t('form.label.factory') }}
    div.form-text {{ $t('form.help.factory') }}

  div.btn-group
    Button(type="submit" level="success")
      Save(size="16").me-1
      | {{ $t('actions.save') }}
    ButtonLink(:to="{ name: 'cms.pages.index' }" level="outline-secondary")
      ArrowLeft(size="16").me-1
      | {{ $t('actions.go_back') }}
</template>
