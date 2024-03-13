<script setup>
import {ref, inject} from 'vue'

const requester = inject('requester')
const auth = inject('auth')
const error = ref()
const login = ref({
  username: null,
  password: null
})

const onSubmit = async () => {
  error.value = null
  try {
    const { username, password } = login.value
    const { token } = await requester.post('/security/sign-in', { username, password }, { 'Content-Type': 'application/json' })
    auth.accessToken = token
    window.location.reload()
  } catch (e) {
    error.value = e.message
  }
}
</script>

<template lang="pug">
main.h-screen.w-100
  section.container
    div.row.py-5.text-center
      h1.text-dark {{ $t('admin') }}

    div.row
      div.col-xxl-4.col-xl-3
      div.col-xxl-4.col-xl-6
        div.rounded.bg-white.shadow.shadow-dark.p-5
          p(v-if="error").alert.alert-danger {{ $t(error) }}

          form(action="/" method="post" @submit.prevent="onSubmit")
            .mb-3
              label(for="username") {{ $t('form.label.username') }}
              input#username.form-control(name="username" v-model="login.username" required)

            .mb-3
              label(for="password") {{ $t('form.label.password') }}
              input#password.form-control(name="password" v-model="login.password" type="password" required)

            button.w-100.btn.btn-primary(type="submit") {{ $t('actions.sign_in') }}
      div.col-xxl-4.col-xl-3
</template>
