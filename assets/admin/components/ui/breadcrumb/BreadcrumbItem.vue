<script setup>
import {defineProps} from 'vue'

const { to } = defineProps({
  to: {
    type: String|Object,
    default: null
  }
})
</script>

<template lang="pug">
li.breadcrumb-item
  RouterLink(:to="to" v-if="to")
    slot
  slot(v-else)
</template>
