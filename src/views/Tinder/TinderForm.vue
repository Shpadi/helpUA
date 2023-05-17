<template>
    <div>
        <h2 class="mt-4"> Create your dating account </h2>
        <v-form class="pa-5">
            <v-file-input
                v-model="files"
                accept="image/png, image/jpeg"
                placeholder="Pick an avatar"
                prepend-icon="mdi-paperclip"
                label="Avatar"
                variant="outlined"
            >
                <template v-slot:selection="{ fileNames }">
                <template v-for="fileName in fileNames" :key="fileName">
                    <v-chip
                    size="small"
                    label
                    color="primary"
                    class="me-2"
                    >
                    {{ fileName }}
                    </v-chip>
                </template>
                </template>
            </v-file-input>
            <v-textarea v-model="description" variant="outlined" />
            <v-btn class="bg-blue-darken-3">Submit</v-btn>
        </v-form>
    </div>  
</template>

<script setup lang="ts">
import { ref } from 'vue'

const files = ref()
const description = ref('')
</script>