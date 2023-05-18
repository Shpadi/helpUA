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
    name: 'Dating',
    page: 'dating',
}, {
    name: 'OLX',
    page: 'olx'
}, {
    name: 'Professors',
    page: 'professors'
},{
    name: 'Help',
    page: 'help'
}]
</script>