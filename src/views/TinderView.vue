<template>
    <v-btn @click="router.push({ name: 'tinder-form' })">
        Create Tindre account
    </v-btn>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>