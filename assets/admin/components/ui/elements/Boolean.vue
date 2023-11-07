<script setup>
import { defineProps } from "vue"
import YesNo from "@admin/components/ui/badge/YesNo.vue";

const { value } = defineProps({
  value: {
    type: Boolean,
    default: false
  }
})
</script>

<template lang="pug">
YesNo(:bool="value")
</template>
