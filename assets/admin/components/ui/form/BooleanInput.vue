<script setup>
import { defineProps, defineEmits } from 'vue'

const emit = defineEmits(['input'])
const { name, type, value, label, error, help } = defineProps({
  name: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: null
  },
  value: {
    type: Boolean,
    default: null
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
input(type="checkbox", :id="name", :name="name", :checked="!!value", @input.stop="emit('input', $event.target.checked)").form-check-input.me-2
label(v-if="label", :for="name").form-check-label {{ $t(label) }}
span.invalid-feedback(v-if="error") {{ $t(error) }}
div.form-text(v-if="help") {{ $t(help) }}
</template>
