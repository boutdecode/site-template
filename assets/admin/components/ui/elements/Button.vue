<script setup>
import {defineProps, computed} from 'vue'
import {Loader} from 'lucide-vue-next'

const { type, level, size, form, loading, position, outline, title } = defineProps({
  type: {
      type: String,
      default: "button"
  },
  level: {
    type: String,
    default: 'primary',
  },
  size: {
    type: String,
    default: null,

    validator(value) {
      ['lg', 'sm'].includes(value);
    }
  },
  form: {
      type: String,
      default: null
  },
  loading: {
      type: Boolean,
      default: false
  },
  position: {
    type: String,
    default: 'right',

    validator(value) {
      return ['left', 'right'].includes(value)
    }
  },
  outline: {
    type: Boolean,
    default: false,
  },
  title: String,
})

const className = computed(() => {
  return `btn btn-${outline ? 'outline-' : ''}${level} ${getButtonSize()}`;
})

const getButtonSize = () => {
  if (size) {
    return `btn-${size}`;
  }

  return '';
}
</script>

<template lang="pug">
button.d-flex.align-items-center(:type="type", :form="form", :disabled="loading", :class="className", v-tooltip:500="title")
  slot(v-if="position === 'left' && !loading", name="icon")
  Loader(v-if="position === 'left' && loading").me-lg-2.me-1
  slot
  slot(v-if="position === 'right' && !loading", name="icon")
  Loader(v-if="position === 'right' && loading").ms-lg-2.ms-1
</template>
