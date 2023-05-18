<template>
    <div>
        <h2 class="mt-4"> Create your dating account </h2>
        <v-form class="pa-5">
            <v-file-input
                v-model="profile.files"
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
            <v-textarea v-model="profile.description" variant="outlined" />
            <v-btn class="bg-blue-darken-3" @click="submitDating" :loading="loading">Submit</v-btn>
        </v-form>
    </div>  
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()

const loading = ref(false)

const router = useRouter()

const profile = reactive({
    files: [],
    description: ''
})

const submitDating = async () => {
    loading.value = true
    await store.dispatch('dating/createDatingProfile', profile)
    loading.value = false
    router.push({ name: 'dating' })
}
</script>