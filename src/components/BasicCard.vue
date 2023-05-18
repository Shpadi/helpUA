<template>
    <v-card
    class="w-100"
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

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn
        :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        @click="show = !show"
      ></v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
            {{  element.description  }}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'

defineProps<{
    element: any
}>()

const show = ref(false)
</script>