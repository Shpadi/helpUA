<template>
    <div class="d-flex align-center justify-space-between bg-blue-lighten-2 pa-3">
        <div class="d-flex">
            <template v-for="item in menuItems" :key="item.page">
                <router-link class="text-white px-3 text-decoration-none text-h6" :to="item.page">
                    {{  item.name  }}
                </router-link>
            </template>
        </div>
        <p class="text-white pointer text-h6" @click="logout"> Вийти </p>
    </div>
    <div>
        <router-view/>
    </div>
</template>

<script lang="ts" setup>
import router from '@/router';

const menuItems = [{
    name: 'Головна',
    page: '/',
},
{
    name: 'Знайомства',
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
</script>

<style>
.pointer {
    cursor: pointer;
}
</style>