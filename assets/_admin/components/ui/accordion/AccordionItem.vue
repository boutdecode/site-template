<script setup>
import { defineProps } from "vue"

const id = crypto.randomUUID()
const { title, key } = defineProps({
  title: {
    type: String,
    default: ''
  }
})
</script>

<template lang="pug">
div(ref="accordion").accordion-item
  div.accordion-header
    button(type="button", data-bs-toggle="collapse", :data-bs-target="`#accordion-${id}`", aria-expanded="false", aria-controls="collapseOne").accordion-button.collapsed
      | {{ title }}

  div(:id="`accordion-${id}`").accordion-collapse.collapse
    div.accordion-body
      slot
</template>
