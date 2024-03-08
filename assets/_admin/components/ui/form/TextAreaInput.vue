<script setup>
import { defineProps, defineEmits } from 'vue'

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
label(v-if="label", :for="name") {{ $t(label) }}
textarea(:id="name", :name="name", :value="value", :placeholder="placeholder", :required="required", rows="4", @input.stop="emit('input', $event.target.value)").form-control
span.invalid-feedback(v-if="error") {{ $t(error) }}
div.form-text(v-if="help") {{ $t(help) }}
</template>
