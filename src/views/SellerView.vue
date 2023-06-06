<template>
    <div class="d-flex justify-space-between ma-2 pa-2">
        <div class="d-flex align-center w-75">
            <v-autocomplete
                variant="outlined"
                v-model="type"
                :items="typesList"
                label="Select Type"
                class="rounded-lg"
            />
            <LocationSearch @search="searchFunction" :loading="loading" class="w-75" />
        </div>
        <v-btn
            class="ma-2 text-white"
            icon="mdi-plus"
            color="green-lighten-2"
            @click="router.push({ name: 'seller-form' })"
        ></v-btn>
    </div>
    <div class="d-flex align-self-start pa-6 flex-wrap w-100">
        <div class="w-25 my-3" v-for="profile in sellItems" :key="profile.uuid">
            <BasicCard :element="profile" @respond="respondToSeller" />
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

const sellItems = computed(() => store.state.seller.sellItems)

const loading = ref(false)

const type = ref('')

const user = computed(() => store.state.auth.currentUser)

const searchFunction = async (positionData: any) => {
    loading.value = true
    const payload = { geoData: positionData, type: type.value  }
    await store.dispatch('seller/searchSellerItems', payload)
    loading.value = false
}

const respondToSeller = (element: any) => {
    const respond = {
        user: user.value,
        item: { ...element },
        type: 'seller'
    }
    store.dispatch('responds/createRespond', respond)
}

onMounted(() => {
    store.dispatch('seller/fetchSellItems')
})

const typesList = [
    'Авто',
'Дім та сад',
'Дитячі речі',
'Електроніка', 
'Запчастини для транспорту',
'Кухня',
'Одяг',
'Спортивні товари',
'Товари для дому',
'Товари для тварин',
'Мебель',
'Нерухомість', 
'ВІДДАМ БЕЗКОШТОВНО'
]
</script>