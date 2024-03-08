<script setup>
import {defineProps, defineEmits} from 'vue'

const emit = defineEmits(['next', 'previous'])
const { pagination } = defineProps({
  pagination: {
    type: Object,
    required: true
  }
})
</script>

<template lang="pug">
nav
  ul.pagination.justify-content-end
    li.page-item(v-if="pagination.page > 1")
      Button.page-link(@click="emit('previous')") {{ $t('actions.previous') }}
    li.page-item.active
      Button.page-link {{ pagination.page }} / {{ Math.ceil(pagination.total / pagination.limit) }}
    li.page-item(v-if="pagination.page < Math.ceil(pagination.total / pagination.limit)")
      Button.page-link(@click="emit('next')") {{ $t('actions.next') }}
</template>
