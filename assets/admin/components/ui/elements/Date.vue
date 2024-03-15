<script setup>
import {defineProps} from 'vue'

const { value, options } = defineProps({
  value: {
    type: Date,
    required: true
  },
  options: {
    type: Object,
    default: {}
  }
})
</script>

<template lang="pug">
span(v-date="options") {{ value }}
</template>
