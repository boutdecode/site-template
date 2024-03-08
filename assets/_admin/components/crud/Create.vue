<script setup>
import { inject, defineEmits, defineProps, ref, onMounted } from "vue"
import Modal from "../../components/ui/modal/Modal.vue"
import Button from "../../components/ui/elements/Button.vue"

const emit = defineEmits(['success'])
const { form, store } = defineProps({
  form: {
    type: [Object, Function],
    required: true,
  },
  store: [Object, Function],
})

const emitter = inject('emitter')
const error = ref()
const loading = ref(false)
const container = ref()

const { create } = store()

const createItem = event => {
  let item = event
  if (event instanceof Event) {
    event.preventDefault()
    item = event.target
  }

  create(item)
    .then(() => {
      emitter.emit('modal:create-item:hide')
      emit('success', item)

      error.value = null
      loading.value = false
    })
    .catch((err) => {
      error.value = err.message
      loading.value = false
    })
}

onMounted(() => {
  emitter.on('modal:create-item:show', () => {
    const form = container.value.querySelector('form')
    if (form) {
      form.reset()
    }
  })
})
</script>

<template lang="pug">
Modal(id="create-item", size="xl", scroll="true", :title="$t('create_resource')", :options="{ backdrop: 'static' }")
  template(v-slot:body)
    p(v-if="error").alert.alert-danger {{ error }}
    div(ref="container")
      component#create-form(:is="form", @submit="createItem")

  template(v-slot:footer="{ close }")
    Button(level="success", :loading="loading", type="submit", form="create-form") {{ $t('actions.create') }}
    Button(level="secondary", @click="close") {{ $t('actions.cancel') }}
</template>
