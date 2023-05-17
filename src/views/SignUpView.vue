<template>
  <div class="d-flex h-screen w-100 justify-center align-center">
    <v-form class="d-block w-50 ma-auto">
      <h2> Sign up </h2>
      <v-text-field
        v-model="user.firstname"
        :rules="rules.nameRules"
        :counter="10"
        label="First name"
        variant="outlined"
        required
      >
      </v-text-field>
      <v-text-field
        v-model="user.lastname"
        :rules="rules.nameRules"
        :counter="10"
        label="Last name"
        variant="outlined"
        required
      >
      </v-text-field>
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
      <v-btn block class="bg-blue-darken-3 pa-3 d-inline" @click="registerUser">Submit</v-btn>
    </v-form>
  </div>
  </template>
<script lang="ts" setup>
import { reactive } from 'vue'
import { useStore } from 'vuex';

const store = useStore()

const user = reactive({
  firstname: '',
  lastname: '',
  email: '',
  password: ''
})

const rules = {
  nameRules: [
    (value: string) => {
      if (value) return true

      return 'Name is requred.'
    },
    (value: string) => {
      if (value?.length <= 10) return true

      return 'Name must be less than 10 characters.'
    },
  ],
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

const registerUser = () => {
  store.dispatch('auth/registerUser', user)
}
</script>