<template>
    <v-card
    class="mx-3 my-3 w-25"
    max-width="344"
  >
    <v-img
      :src="element.avatar"
      width="auto"
      height="200"
    ></v-img>

    <v-card-title>
        {{  element.firstname  }}
        {{  element.lastname  }}
    </v-card-title>

    <v-card-subtitle class="pb-4">
        {{  element.description  }}
    </v-card-subtitle>
  </v-card>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'

defineProps<{
    element: any
}>()

const show = ref(false)
</script>