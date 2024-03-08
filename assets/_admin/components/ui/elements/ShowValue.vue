<script setup>
import { defineProps } from "vue"
import BooleanValue from "../../../components/ui/elements/Boolean.vue"
import StringValue from "../../../components/ui/elements/String.vue"
import ObjectValue from "../../../components/ui/elements/Object.vue"
import DateValue from "../../../components/ui/elements/Date.vue"

const { value } = defineProps({
  value: {
    type: [String, Number, Boolean, Object],
    default: ''
  }
})

const getComponentType = value => {
  switch (typeof value) {
    case 'string':
      return StringValue
    case 'number':
      return 'InputNumber'
    case 'boolean':
      return BooleanValue
    case 'object':
      return value instanceof Date ? DateValue : ObjectValue
    default:
      return StringValue
  }
}
</script>

<template lang="pug">
component(:is="getComponentType(value)", :value="value")
</template>
