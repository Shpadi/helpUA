<template>
    <div class="d-flex align-center justify-space-between bg-blue-lighten-2 pa-3">
        <div class="d-flex">
            <template v-for="item in menuItems" :key="item.page">
                <router-link class="text-white px-3 text-decoration-none text-h6" :to="item.page">
                    {{  item.name  }}
                </router-link>
            </template>
        </div>
        <div class="d-flex align-center">
            <v-btn
                class="ma-2"
                icon="mdi-account-circle"
                @click="router.push({ name: 'profile' })"
            ></v-btn>
            <v-btn
                class="ma-2"
                :icon="isImagesEnabled ? 'mdi-image-check-outline' : 'mdi-image-broken'"
                @click="setImageStatus"
            ></v-btn>
            <p class="text-white pointer text-h6" @click="logout"> Вийти </p>
        </div>
    </div>
    <div>
        <router-view/>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import router from '@/router';
import { useStore } from 'vuex'

const store = useStore()

const menuItems = [{
    name: 'Головна',
    page: '/',
},
{
    name: 'Друзі',
    page: 'dating',
}, {
    name: 'Барахолка',
    page: 'seller'
}, {
    name: 'Фахівці',
    page: 'experts'
},{
    name: 'Соцмережі',
    page: 'help'
}]

const logout = () => {
    localStorage.removeItem('crd')
    router.push({ name: 'login' })
}

const isImagesEnabled = computed(() => store.getters['auth/isImagesStatusEnabled'])

const setImageStatus = () => {
    localStorage.setItem('isImagesEnabled', String(!isImagesEnabled.value))
    store.commit('auth/setImagesStatus', !isImagesEnabled.value)
}
</script>

<style>
.pointer {
    cursor: pointer;
}
</style>