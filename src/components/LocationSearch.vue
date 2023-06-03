<template>
    <div class="d-flex align-center">
        <v-autocomplete
            variant="outlined"
            v-model="geoPosition.countryCode"
            :items="countries"
            item-title="countryName"
            item-value="countryCode"
            label="Select Country"
            @update:model-value="getCities"
            class="ma-2"
        >
        </v-autocomplete>
        <v-autocomplete
            variant="outlined"
            v-model="geoPosition.cityCode"
            :items="cities"
            item-title="name"
            item-value="adminCode1"
            label="Select City"
            :disabled="!geoPosition.countryCode"
            class="ma-2"
        >
        </v-autocomplete>
        <v-btn class="bg-blue-darken-3 mb-5" @click="search" :loading="loading">Submit</v-btn>
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, defineProps, defineEmits, } from 'vue'
import { useStore } from 'vuex'

defineProps<{
    loading: boolean
}>()

const emits = defineEmits(['search'])

const geoPosition = reactive({
    countryCode: '',
    cityCode: ''
})

const store = useStore()

const countries = computed(() => store.state.geo.countries)

const cities = computed(() => store.state.geo.cities)

onMounted(() => {
    store.dispatch('geo/getCountries')
})

const getCities = () => {
    store.dispatch('geo/getCities', geoPosition.countryCode)
}

const search = () => {
    emits('search', geoPosition)
}
</script>