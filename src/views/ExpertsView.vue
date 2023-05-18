<template>
    <div class="d-flex justify-space-between">
        <v-btn
            class="ma-2 text-white"
            icon="mdi-map"
            color="blue-lighten-2"
        ></v-btn>
        <v-btn
            class="ma-2 text-white"
            icon="mdi-plus"
            color="green-lighten-2"
            @click="router.push({ name: 'experts-form' })"
        ></v-btn>
    </div>
    <div class="d-flex align-self-start pa-6 flex-wrap w-100">
        <div class="w-25 my-3" v-for="profile in expertsList" :key="profile.uuid">
            <BasicCard :element="profile" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, computed } from 'vue';
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import BasicCard from '@/components/BasicCard.vue';

const store = useStore()

const router = useRouter()

const expertsList = computed(() => store.state.experts.experts)

onMounted(() => {
    store.dispatch('experts/fetchExperts')
})
</script>