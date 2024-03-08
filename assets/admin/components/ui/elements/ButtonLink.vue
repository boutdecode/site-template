<script setup>
import {defineProps, computed} from 'vue'
import {Loader} from 'lucide-vue-next'

const { to, level, size, loading, position, outline, title } = defineProps({
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
  to: String|Object
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
RouterLink.d-flex.align-items-center(:to="to", :disabled="loading", :class="className", v-tooltip:500="title")
  slot(v-if="position === 'left' && !loading", name="icon")
  Loader(v-if="position === 'left' && loading").me-lg-2.me-1
  slot
  slot(v-if="position === 'right' && !loading", name="icon")
  Loader(v-if="position === 'right' && loading").ms-lg-2.ms-1
</template>
