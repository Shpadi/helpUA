<template>
    <div class="d-flex justify-space-between ma-2 pa-2">
        <LocationSearch @search="searchFunction" :loading="loading" class="w-50" />
        <v-btn
            class="ma-2 text-white"
            icon="mdi-plus"
            color="green-lighten-2"
            @click="router.push({ name: 'dating-form' })"
        ></v-btn>
    </div>
    <div class="d-flex align-self-start pa-6 flex-wrap w-100">
        <div class="w-25 my-3" v-for="profile in datingProfiles" :key="profile.uuid">
            <BasicCard :element="profile" @respond="respondToDating" />
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

const datingProfiles = computed(() => store.state.dating.datingsProfiles)

const loading = ref(false)

const user = computed(() => store.state.auth.currentUser)

const searchFunction = (positionData: any) => {
    loading.value = true
    store.dispatch('dating/searchDatingProfiles', positionData)
    loading.value = true
}

const respondToDating = (element: any) => {
    const respond = {
        user: user.value,
        item: { ...element },
        type: 'dating'
    }
    store.dispatch('responds/createRespond', respond)
}

onMounted(() => {
    store.dispatch('dating/fetchDatingProfiles')
})
</script>