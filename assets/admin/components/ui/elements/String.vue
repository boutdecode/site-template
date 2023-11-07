<script setup>
import { defineProps } from "vue"

const { value } = defineProps({
  value: {
    type: String,
    default: ''
  }
})
</script>

<template lang="pug">
| {{ value }}
</template>
