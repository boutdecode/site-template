<script setup>
import {ref, inject, onMounted, defineProps, computed} from 'vue'
import {Toast} from 'bootstrap'

const emitter = inject('emitter')
const toast = ref()
const message = ref('')

const { title, type } = defineProps({
  title: String,
  type: {
    type: String,
    default: 'white',
    validator(value) {
      return ['success', 'danger', 'warning', 'info', 'white', 'dark'].includes(value)
    }
  }
})

onMounted(() => {
  const notification = new Toast(toast.value)
  emitter.on(`notification:${toast.value.id}:show`, ({ message: newMessage } = {}) => {
    message.value = newMessage || ''
    notification.show()
  })
})

const className = computed(() => {
  return `text-bg-${type}`
})
</script>

<template lang="pug">
div(role="alert" aria-live="assertive" aria-atomic="true" data-bs-dismiss="toast" ref="toast" :class="className").toast.align-items-center.border-0
  header(v-if="title").toast-header
    strong.me-auto {{ $t(title) }}
  div.d-flex
    div.toast-body
      slot {{ message }}
</template>
