<script setup>
import { ref, onMounted } from "vue"
import { Collapse } from "bootstrap";

const accordion = ref()
onMounted(() => {
  Array.from(accordion.value.querySelectorAll('.accordion-button')).forEach(el => {
    return new Collapse(el, { toggle: false })
  })
})
</script>

<template lang="pug">
div(ref="accordion").accordion
  slot
</template>
