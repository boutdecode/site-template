<script setup>
import {Users, ArrowRightCircle, Files} from 'lucide-vue-next'
import {ref, onMounted} from 'vue'

import usePageStore from '@admin/stores/pages'
import useAdminStore from '@admin/stores/admins'

const countPages = ref(0)
const countAdmins = ref(0)

const {find: findPages} = usePageStore()
const {find: findAdmins} = useAdminStore()

onMounted(async () => {
  const { items: pages } = await findPages()
  countPages.value = pages.length

  const { items: admins } = await findAdmins()
  countAdmins.value = admins.length
})
</script>

<template lang="pug">
h1.h2.mb-4 {{ $t('dashboard') }}

section.row.row-cols-1.row-cols-md-2.row-cols-lg-3.g-4
  div.col
    div.card.text-bg-danger
      div.card-body.d-flex.justify-content-between.align-items-center
        Users(size="64")
        div.text-end
          span.fs-1.fw-bold {{ countAdmins }}
          p {{ $t('admins') }}
      footer.card-footer
        RouterLink.d-flex.justify-content-between.align-items-center.text-decoration-none.text-white(:to="{ name: 'admin.users.index' }")
          | {{ $t('see_more') }}
          ArrowRightCircle(size="24")

  div.col
    div.card.text-bg-primary
      div.card-body.d-flex.justify-content-between.align-items-center
        Files(size="64")
        div.text-end
          span.fs-1.fw-bold {{ countPages }}
          p {{ $t('pages') }}
      footer.card-footer
        RouterLink.d-flex.justify-content-between.align-items-center.text-decoration-none.text-white(:to="{ name: 'cms.pages.index' }")
          | {{ $t('see_more') }}
          ArrowRightCircle(size="24")

</template>
