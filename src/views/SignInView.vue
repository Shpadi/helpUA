
<template>
    <div class="d-flex h-screen w-100 justify-center align-center">
        <v-form class="d-block w-50 ma-auto">
            <h2> Log In </h2>
            <v-text-field
                v-model="user.email"
                :rules="rules.emailRules"
                label="E-mail"
                variant="outlined"
                required
            >
            </v-text-field>
            <v-text-field
                v-model="user.password"
                label="Password"
                type="password"
                variant="outlined"
                required
            >
            </v-text-field>
            <v-btn block class="bg-blue-darken-3 pa-3 d-inline" @click="loginUser">Submit</v-btn>
            <router-link to="/sign-up">Sign Up</router-link>
        </v-form>
    </div>
  </template>
<script lang="ts" setup>
import { reactive } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const user = reactive({
  email: '',
  password: ''
})

const rules = {
  emailRules: [
  (value: string) => {
      if (value) return true

      return 'E-mail is requred.'
    },
    (value: string) => {
      if (/.+@.+\..+/.test(value)) return true

      return 'E-mail must be valid.'
    },
  ]
}

const loginUser = () => {
    store.dispatch('auth/loginUser', user)
}
</script>