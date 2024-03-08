<script setup>
import { defineProps, defineEmits, computed } from 'vue'
import TextInput from "../../../components/ui/form/TextInput.vue"
import BooleanInput from "../../../components/ui/form/BooleanInput.vue"
import DateInput from "../../../components/ui/form/DateInput.vue"
import ObjectInput from "../../../components/ui/form/ObjectInput.vue"
import TextAreaInput from "../../../components/ui/form/TextAreaInput.vue"

const emit = defineEmits(['input'])
const { name, type, label, error, help, placeholder, value } = defineProps({
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
  error: {
    type: String,
    default: null
  },
  help: {
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
  }
})

const getComponentType = value => {
  switch (typeof value) {
    case 'string':
      return value.length > 128 ? TextAreaInput : TextInput
    case 'number':
      return 'InputNumber'
    case 'boolean':
      return BooleanInput
    case 'object':
      return value instanceof Date ? DateInput : ObjectInput
    default:
      return TextInput
  }
}

const isAvailableKey = computed(() => {
  return !['_id', 'createdAt', 'editedAt'].includes(name)
})
</script>

<template lang="pug">
div(v-if="isAvailableKey").form-group
  component(:is="getComponentType(value)", :id="name", :label="label", :name="name", :value="value", :placeholder="placeholder", :required="required", :error="error", :help="help", @input="emit('input', $event)")
</template>
