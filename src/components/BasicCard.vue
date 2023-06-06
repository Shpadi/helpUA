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

    <v-card-subtitle v-if="element.skills">
        {{ element.skills.join(', ') }}
    </v-card-subtitle>

    <v-card-subtitle v-if="element.interests">
        {{ element.interests.join(', ') }}
    </v-card-subtitle>

    <v-card-actions>
      <v-btn :disabled="!showButton" class="bg-green-lighten-2 text-white" @click="sendRespond">
        Відгукнутися
      </v-btn>

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
import { ref, defineProps, defineEmits, computed } from 'vue'
import { useStore } from 'vuex'

const props = defineProps<{
    element: any
}>()

const emits = defineEmits(['respond'])

const show = ref(false)
const showButton = ref(true)

const store = useStore()

const user = computed(() => store.state.auth.currentUser)

const isMe = computed(() => user.value.uuid === props.element.owner_id)

const sendRespond = () => {
  emits('respond', props.element)
  showButton.value = false
}
</script>