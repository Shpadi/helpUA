<template>
    <v-card>
        <v-card-text>
            {{ respondUserFullName }}
            {{ actionLabel }}
            ( звяжіться через {{ respondUserEmail  }})
        </v-card-text>
    </v-card>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue'

const props = defineProps<{
    respond: any
}>()

const respond = computed(() => props.respond.respond)

const respondUserFullName = computed(() => `${respond.value?.user?.firstname} ${respond.value?.user?.lastname}`)

const respondUserEmail = computed(() => respond.value?.user?.email)

const respondType = computed(() => respond.value?.type)

const itemUserFullName = computed(() => `${respond.value.item?.firstname} ${respond.value.item?.lastname}`)

const actionLabel = computed(() => {
    switch(respondType.value) {
        case 'expert':
            return `зацікавився вашими послугами ${respond.value.item.skills}`
        case 'dating':
            return `поставив вам вподобайку ${itemUserFullName.value}`
        case 'seller':
            return 'зацікавився вашим товаром'
        default:
            return ''
    }
})
</script>