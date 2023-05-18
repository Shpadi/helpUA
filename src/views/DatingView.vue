<template>
    <div class="d-flex">
        <v-icon color="red" icon="mdi-vuetify"></v-icon>
    </div>
    <v-btn @click="router.push({ name: 'dating-form' })">
        Create Tindre account
    </v-btn>
    <div class="d-flex">
        <BasicCard v-for="profile in datingProfiles" :key="profile.uuid" :element="profile" />
    </div>
</template>

<script lang="ts" setup>
import { onMounted, computed } from 'vue';
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import BasicCard from '@/components/BasicCard.vue';

const store = useStore()

const router = useRouter()

const datingProfiles = computed(() => store.state.dating.datingsProfiles)

onMounted(() => {
    store.dispatch('dating/fetchDatingProfiles')
})
</script>