<script setup>
import { ref, inject, onMounted, defineEmits, defineProps } from "vue"
import Modal from "../../components/ui/modal/Modal.vue"
import Button from "../../components/ui/elements/Button.vue"
import Input from "../../components/ui/form/Input.vue"

const emit = defineEmits(['success'])
const emitter = inject('emitter')
const item = ref({})
const error = ref(null)
const loading = ref(false)
const { store } = defineProps({
  store: [Object, Function],
})

const { edit } = store()

onMounted(() => {
  emitter.on('modal:edit-item:show', resource => item.value = resource)
})

const updateItem = (item) => {
  error.value = null
  loading.value = true
  edit(item)
    .then(() => {
      emitter.emit('modal:edit-item:hide')
      emit('success', item)

      error.value = null
      loading.value = false
    })
    .catch((err) => {
      error.value = err.message
      loading.value = false
    })
}
</script>

<template lang="pug">
Modal(id="edit-item", size="xl", scroll="true", :title="$t('edit_resource')", :options="{ backdrop: 'static' }")
  template(v-slot:body)
    p(v-if="error").alert.alert-danger {{ error }}
    Input(v-for="(value, key) in item", :label="$t(key)", :name="key", :value="value", :key="key", @input="item[key] = $event").mb-3

  template(v-slot:footer="{ close }")
    Button(level="primary", @click="updateItem(item)", :loading="loading") {{ $t('actions.save') }}
    Button(level="secondary", @click="close") {{ $t('actions.cancel') }}
</template>
