<script setup>
import {useRoute, useRouter} from 'vue-router'
import {Save, ArrowLeft} from 'lucide-vue-next'
import {ref, inject, onMounted, computed} from 'vue'
import useStore from './../../stores/admins'
import Breadcrumb from '@admin/components/ui/breadcrumb/Breadcrumb.vue'
import BreadcrumbItem from '@admin/components/ui/breadcrumb/BreadcrumbItem.vue'
import Button from '@admin/components/ui/elements/Button.vue'
import ButtonLink from '@admin/components/ui/elements/ButtonLink.vue'

const {edit, get, create} = useStore()
const config = inject('config')
const emitter = inject('emitter')
const item = ref({
  username: null,
  password: null,
  email: null,
  enabled: false
})
const route = useRoute()
const router = useRouter()

onMounted(async () => {
  if (route.params.id) {
    fetchItem(route.params.id)
  }
})

const fetchItem = async (id) => {
  item.value = await get(id)
  delete item.value.password
}

const handleSubmit = async () => {
  if (item.value._id) {
    await edit(item.value)
    emitter.emit('notification:edited-item:show')
  } else {
    await create(item.value)
    await router.push({ name: 'admin.users.index' })
    emitter.emit('notification:created-item:show')
  }
}

const mode = computed(() => item.value._id ? 'edit' : 'create')
</script>

<template lang="pug">
Breadcrumb.mb-3
  BreadcrumbItem(:to="{ name: 'home' }") {{ $t('dashboard') }}
  BreadcrumbItem(:to="{ name: 'admin.users.index' }") {{ $t('admins') }}
  BreadcrumbItem.active {{ $t(`${mode}_resource`) }}

h1.h2 {{ $t(`${mode}_resource`) }}
form(@submit.prevent="handleSubmit")
  div.mb-4
    label(for="username") {{ $t('form.label.username') }}
    input#username.form-control(type="text" name="username" v-model="item.username" :readonly="mode === 'edit'" :disabled="mode === 'edit'" required)

  div.mb-4
    label(for="password") {{ $t('form.label.password') }}
    input#password.form-control(type="password" name="password" v-model="item.password" :required="mode === 'create'")

  div.mb-4
    label(for="email") {{ $t('form.label.email') }}
    input#email.form-control(type="email" name="email" v-model="item.email" required)

  div.mb-4.form-check.form-switch
    input#enabled.form-check-input(type="checkbox" name="enabled" v-model="item.enabled")
    label.form-check-label(for="enabled") {{ $t('form.label.enabled') }}

  div.btn-group
    Button(type="submit" level="success")
      Save(size="16").me-1
      | {{ $t('actions.save') }}
    ButtonLink(:to="{ name: 'cms.pages.index' }" level="outline-secondary")
      ArrowLeft(size="16").me-1
      | {{ $t('actions.go_back') }}
</template>
