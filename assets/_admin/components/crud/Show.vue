<script setup>
import { ref, inject, onMounted } from "vue"
import Modal from "../../components/ui/modal/Modal.vue"
import Button from "../../components/ui/elements/Button.vue"
import ShowValue from "../../components/ui/elements/ShowValue.vue"

const emitter = inject('emitter')
const item = ref({})

onMounted(() => {
  emitter.on('modal:show-item:show', resource => item.value = resource)
})
</script>

<template lang="pug">
Modal(id="show-item", size="xl", scroll="true", :title="$t('preview_resource')")
  template(v-slot:body)
    div(v-for="(value, key) in item").row.mb-3.pb-3.border-bottom
      div.col-sm-2
        span {{ $t(key) }}
      div.col-sm-10
        ShowValue(:value="value")

  template(v-slot:footer="{ close }")
    Button(level="secondary", @click="close") {{ $t('actions.close') }}
</template>
