<script setup>
import { defineProps, inject } from "vue"
import Menu from "@admin/components/ui/menu/Menu.vue"
import DropdownHeader from "@admin/components/ui/dropdown/DropdownHeader.vue"
import DropdownAction from "@admin/components/ui/dropdown/DropdownAction.vue"

const emitter = inject('emitter')

const { item } = defineProps({
  item: Object,
})
</script>

<template lang="pug">
Menu
  DropdownHeader {{ $t('actions') }}
  DropdownAction(@click="emitter.emit('action:show-item', item)") {{ $t('actions.show') }}
  DropdownAction(@click="emitter.emit('action:edit-item', item)") {{ $t('actions.edit') }}
  DropdownAction(@click="emitter.emit('action:delete-item', item)")
    span.text-danger {{ $t('actions.delete') }}
  slot
</template>
