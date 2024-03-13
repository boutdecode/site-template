import { ref, inject } from 'vue'
import { defineStore } from 'pinia'

export default defineStore('pages', () => {
  const requester = inject('requester')
  const emitter = inject('emitter')
  const items = ref([])

  async function find () {
    const pages = await requester.get('/pages')
    items.value = pages.map(page => {
      return {
        ...page,
        createdAt: new Date(page.createdAt),
        editedAt: new Date(page.editedAt)
      }
    })

    return items.value
  }

  async function get (id) {
    try {
      return await requester.get(`/pages/${id}`)
    } catch (e) {
      emitter.emit('')
    }
  }

  async function create (item) {
    return await requester.post('/pages', item, { 'Content-Type': 'application/json' })
  }

  async function edit (item) {
    return await requester.patch(`/pages/${item._id}`, item, { 'Content-Type': 'application/json' })
  }

  async function remove (item) {
    return await requester.delete(`/pages/${item._id}`)
  }

  return { items, get, find, remove, create, edit }
})
