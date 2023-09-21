import { ref, inject } from 'vue'
import { defineStore } from 'pinia'

export default defineStore('pages', () => {
  const requester = inject('requester')
  const items = ref([])

  async function find () {
    const pages = await requester.get('/pages')
    items.value = pages

    return pages
  }

  async function remove (item) {
    return await requester.delete(`/pages/${item._id}`)
  }

  return { items, find, remove }
})
