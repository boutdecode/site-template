<script setup>
import { defineProps, defineEmits } from 'vue'
import Input from "@admin/components/ui/form/Input.vue";
import Accordion from "@admin/components/ui/accordion/Accordion.vue";
import AccordionItem from "@admin/components/ui/accordion/AccordionItem.vue";

const emit = defineEmits(['input'])
const { name, type, placeholder, value, label, error, help } = defineProps({
  name: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: null
  },
  value: {
    type: String,
    default: null
  },
  placeholder: {
    type: String,
    default: null
  },
  required: {
    type: Boolean,
    default: true
  },
  error: {
    type: String,
    default: null
  },
  help: {
    type: String,
    default: null
  },
})
</script>

<template lang="pug">
span {{ $t(label) }}
Accordion
  AccordionItem(v-for="(v, key) in value", :title="key")
    Input(:id="name", :name="name", :value="v", :placeholder="placeholder", :required="required", :error="error", :help="help", @input="emit('input', { ...value, [key]: $event })")
</template>
