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
    type: Date,
    default: (new Date())
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
input(type="date", :value="value.toISOString().slice(0, 10)", :id="name", :name="name", :placeholder="placeholder", :required="required", @input.stop="emit('input', new Date($event.target.value || null))").form-control
span.invalid-feedback(v-if="error") {{ $t(error) }}
div.form-text(v-if="help") {{ $t(help) }}
</template>
