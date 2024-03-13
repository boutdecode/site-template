import { ref, inject } from 'vue'
import { defineStore } from 'pinia'

export default defineStore('admins', () => {
  const requester = inject('requester')
  const emitter = inject('emitter')
  const items = ref([])

  async function find (options = { page: 1, limit: 10 }) {
    const { data, pagination } = await requester.get('/admins', options)
    items.value = data.map(page => {
      return {
        ...page,
        createdAt: new Date(page.createdAt),
        editedAt: new Date(page.editedAt)
      }
    })

    return { items: items.value, pagination }
  }

  async function get (id) {
    try {
      return await requester.get(`/admins/${id}`)
    } catch (e) {
      emitter.emit('notification:error-occurred:show', e)

      return Promise.reject(e.message)
    }
  }

  async function create (item) {
    try {
      return await requester.post('/admins', item, { 'Content-Type': 'application/json' })
    } catch (e) {
      emitter.emit('notification:error-occurred:show', e)

      return Promise.reject(e.message)
    }
  }

  async function edit (item) {
    try {
      return await requester.patch(`/admins/${item._id}`, item, { 'Content-Type': 'application/json' })
    } catch (e) {
      emitter.emit('notification:error-occurred:show', e)

      return Promise.reject(e.message)
    }
  }

  async function remove (item) {
    try {
      return await requester.delete(`/admins/${item._id}`)
    } catch (e) {
      emitter.emit('notification:error-occurred:show', e)

      return Promise.reject(e.message)
    }
  }

  return { items, get, find, remove, create, edit }
})
