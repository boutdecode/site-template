<script setup>
import { defineEmits } from "vue"
import Accordion from "../../components/ui/accordion/Accordion.vue";
import AccordionItem from "../../components/ui/accordion/AccordionItem.vue";

const emit = defineEmits(['submit'])

const createItem = event => {
  const { slug, titleFr, titleEn, descriptionFr, descriptionEn, contentFr, contentEn } = event.target.elements

  emit('submit', {
    slug: slug.value,
    title: { fr: titleFr.value, en: titleEn.value },
    description: { fr: descriptionFr.value, en: descriptionEn.value },
    content: { fr: contentFr.value, en: contentEn.value },
  })
}
</script>

<template lang="pug">
form(@submit.prevent="createItem", ref="form")
  div.mb-3.form-group
    label(for="slug") {{ $t('slug') }}
    input#slug(type="text", name="slug", required).form-control

  span {{ $t('title') }}
  Accordion.mb-3
    AccordionItem(:title="$t('fr')")
      input#title-fr(type="text", name="titleFr", required).form-control
    AccordionItem(:title="$t('en')")
      input#title-en(type="text", name="titleEn", required).form-control

  span {{ $t('description') }}
  Accordion.mb-3
    AccordionItem(:title="$t('fr')")
      textarea(name="descriptionFr", required).form-control
    AccordionItem(:title="$t('en')")
      textarea(name="descriptionEn", required).form-control

  span {{ $t('content') }}
  Accordion.mb-3
    AccordionItem(:title="$t('fr')")
      textarea(name="contentFr", required).form-control
    AccordionItem(:title="$t('en')")
      textarea(name="contentEn", required).form-control
</template>
