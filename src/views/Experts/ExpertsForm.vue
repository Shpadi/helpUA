<template>
    <div>
        <h2 class="mt-4"> What product you want to sell </h2>
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
            <LocationSelect v-model="profile.geoData"/>
            <v-autocomplete
                variant="outlined"
                v-model="profile.skills"
                :items="skillsList"
                label="Select Skills"
                multiple
                class="rounded-lg"
            />
            <v-textarea v-model="profile.description" variant="outlined" />
            <v-btn class="bg-blue-darken-3" @click="submitDating" :loading="loading">Submit</v-btn>
        </v-form>
    </div>  
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import LocationSelect from '@/components/LocationSelect.vue';

const store = useStore()

const loading = ref(false)

const router = useRouter()

const profile = reactive({
    files: [],
    description: '',
    skills: [],
    geoData: {
        countryCode: '',
        cityCode: '',
    }
})

const submitDating = async () => {
    loading.value = true
    await store.dispatch('experts/createExpertsItem', profile)
    loading.value = false
    router.push({ name: 'experts' })
}

const skillsList = ['Будівництво',
'Бьюті індустрія',
'Ветеринар',
'Виховання дітей',
'Водій',
'Дитячий лікар',
'Дизайнер',
'Косметологія',
'Кухар',
'Лікар',
'Маркетинг',
'Майстер манікюру/педікюру',
'Масаж',
'Нотаріус',
'Охорона',
'Офіціант',
'Програмування',
'Психологія',
'Ремонт будівель',
'Ремонт одягу/взуття',
'Фітнес тренер',
'Юрист',
'SMM',
'Інше…']
</script>