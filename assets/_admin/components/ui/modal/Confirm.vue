<script setup>
import { defineProps } from "vue"
import Modal from "../../../components/ui/modal/Modal.vue"
import Button from "../../../components/ui/elements/Button.vue"

const { level } = defineProps({
  level: {
    type: String,
    default: 'danger',
  }
})
</script>

<template lang="pug">
Modal(:options="{ backdrop: 'static', keyboard: false }")
    template#header
        .modal-header
            h5.modal-title {{ $t('confirm_action') }}

    template(v-slot:body)
        slot

    template(v-slot:footer="{ success, close }")
        Button(:level="level", @click="success") {{ $t('yes') }}
        Button(level="secondary", @click="close") {{ $t('no') }}
</template>
