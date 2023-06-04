<template>
   <v-container>
    <v-card>
      <v-card-title>
        <h2>{{ fullName }}</h2>
      </v-card-title>
      <v-card-text>
        <p>Email: {{ user?.email }}</p>
        <p>UUID: {{ user?.uuid }}</p>
      </v-card-text>
    </v-card>
    <v-card>
        <v-card-title>
            Відгуки
        </v-card-title>
        <v-card-text v-for="respond in responds" :key="respond.uuid" >
            <RespondsItem :respond="respond" />
        </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex'
import { computed, watch } from 'vue'
import RespondsItem from '@/components/RespondsItem.vue';

const store = useStore()

const user = computed(() => store.state.auth.currentUser)

const fullName = computed(() => `${user.value?.firstname} ${user.value?.lastname}`)

const responds = computed(() => store.state.responds.userResponds)

watch(user, (value) => {
    if (value) {
        store.dispatch('responds/fetchUserResponds', value.uuid)
    }   
}, {
    immediate: true
})
</script>