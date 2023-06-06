<template>
    <div class="d-flex justify-space-between ma-2 pa-2">
        <div class="d-flex align-center w-75">
            <v-autocomplete
                variant="outlined"
                v-model="skills"
                :items="skillsList"
                label="Select Skills"
                multiple
                class="rounded-lg"
            />
            <LocationSearch @search="searchFunction" :loading="loading" class="w-75" />
        </div>
        <v-btn
            class="ma-2 text-white"
            icon="mdi-plus"
            color="green-lighten-2"
            @click="router.push({ name: 'experts-form' })"
        ></v-btn>
    </div>
    <div class="d-flex align-self-start pa-6 flex-wrap w-100">
        <div class="w-25 my-3" v-for="profile in expertsList" :key="profile.uuid">
            <BasicCard :element="profile" @respond="respondToExpert" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, computed, ref } from 'vue';
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import BasicCard from '@/components/BasicCard.vue';
import LocationSearch from '@/components/LocationSearch.vue';

const store = useStore()

const router = useRouter()

const loading = ref(false)

const skills = ref([])

const expertsList = computed(() => store.state.experts.experts)

const user = computed(() => store.state.auth.currentUser)

const searchFunction = async (positionData: any) => {
    loading.value = true
    const payload = { geoData: positionData, skills: skills.value}
    await store.dispatch('experts/searchExperts', payload)
    loading.value = false
}

const respondToExpert = (element: any) => {
    const respond = {
        user: user.value,
        item: { ...element },
        type: 'expert'
    }
    store.dispatch('responds/createRespond', respond)
}

onMounted(() => {
    store.dispatch('experts/fetchExperts')
})

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