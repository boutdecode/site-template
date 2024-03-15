<script setup>
import {Save} from 'lucide-vue-next'
import {useRoute} from 'vue-router'
import {ref, inject} from 'vue'
import useStore from '../../stores/settings'

import Button from '@admin/components/ui/elements/Button.vue'
import Breadcrumb from '@admin/components/ui/breadcrumb/Breadcrumb.vue'
import BreadcrumbItem from '@admin/components/ui/breadcrumb/BreadcrumbItem.vue'

const config = inject('config')
const emitter = inject('emitter')
const route = useRoute()

const {find, remove, edit} = useStore()
const loading = ref(true)
const items = ref({
  websiteContact: null,
  metaTitle: {},
  metaDescription: {},
  instagramUrl: null
})

const fetchItems = (search = {}) => {
  find(search)
    .then((data) => {
      data.items.forEach(({ key, value}) => {
        if (key === 'metaTitle' || key === 'metaDescription') {
          items.value[key] = JSON.parse(value)
          return
        }
        items.value[key] = value
      })
      loading.value = false
    })
}

const handleSubmit = async () => {
  const settings = []
  for (const key in items.value) {
    if (!items.value[key]) {
      continue
    } else if (key === 'metaTitle' || key === 'metaDescription') {
      settings.push({ key, value: JSON.stringify(items.value[key]) })
      continue
    }
    settings.push({ key, value: items.value[key] })
  }

  await edit({ settings })
  emitter.emit('notification:edited-item:show')
}

fetchItems()
</script>

<template lang="pug">
  Breadcrumb.mb-3
    BreadcrumbItem(:to="{ name: 'home' }") {{ $t('dashboard') }}
    BreadcrumbItem.active {{ $t('settings') }}

  h1.h2.mb-4 {{ $t('settings') }}
  form(@submit.prevent="handleSubmit")
    h5 {{ $t('application') }}
    hr

    div.mb-3
      label(for="site-contact") {{ $t('form.label.site_contact') }}
      input#site-contact.form-control(type="text" name="title" v-model="items.websiteContact" required)

    div.mb-4
      ul.nav.nav-tabs.mb-3(role="tablist")
        li.nav-item(v-for="locale in config.translation.locales")
          button.nav-link(:class="{ 'active': locale === config.translation.locale }" type="button" role="tab" :key="locale" :data-bs-target="'#' + locale + '-pan'" data-bs-toggle="tab") {{ $t(locale) }}

      div.tab-content
        div.tab-pane.fade(v-for="locale in config.translation.locales" role="tabpanel" :id="locale + '-pan'" :key="locale" :class="{ 'show active': locale === config.translation.locale }")
          div.mb-3
            label(for="site-name") {{ $t('form.label.site_name') }}
            input#site-name.form-control(type="text" name="title" v-model="items.metaTitle[locale]" required)
          div.mb-3
            label(for="site-description") {{ $t('form.label.site_description') }}
            input#site-description.form-control(type="text" name="title" v-model="items.metaDescription[locale]" required)

    h5 {{ $t('social_network') }}
    hr

    div.mb-3
      label(for="instagram-url") {{ $t('form.label.instagram_url') }}
      input#instagram-url.form-control(type="text" name="title" v-model="items.instagramUrl")

    Button(type="submit" level="success")
      Save(size="16").me-1
      | {{ $t('actions.save') }}
</template>
