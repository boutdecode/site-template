<script setup>
import { defineProps } from "vue"
import ShowValue from "../../../components/ui/elements/ShowValue.vue";
import Accordion from "../../../components/ui/accordion/Accordion.vue";
import AccordionItem from "../../../components/ui/accordion/AccordionItem.vue";

const { value } = defineProps({
  value: {
    type: Object,
    default: {}
  }
})
</script>

<template lang="pug">
Accordion
  AccordionItem(v-for="(v, key) in value", :title="key")
    ShowValue(:value="v")
</template>
