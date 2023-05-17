<template>
    <div class="d-flex bg-blue-darken-3 pa-3">
        <template v-for="item in menuItems" :key="item.page">
            <router-link class="text-white px-3 text-decoration-none" :to="item.page">
                {{  item.name  }}
            </router-link>
        </template>
    </div>
    <div>
        <router-view/>
    </div>
</template>

<script lang="ts" setup>
const menuItems = [{
    name: 'Home',
    page: '/',
},
{
    name: 'Tinder',
    page: 'tinder',
}, {
    name: 'OLX',
    page: 'olx'
}, {
    name: 'Professors',
    page: 'professors'
}]
</script>