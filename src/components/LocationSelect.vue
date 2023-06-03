<template>
    <v-autocomplete
        variant="outlined"
        v-model="geoPosition.countryCode"
        :items="countries"
        item-title="countryName"
        item-value="countryCode"
        placeholder="Select Country"
        @update:model-value="getCities"
        label="Select Country"
    >
    </v-autocomplete>
    <v-autocomplete
        variant="outlined"
        v-model="geoPosition.cityCode"
        :items="cities"
        item-title="name"
        item-value="adminCode1"
        placeholder="Select City"
        :disabled="!geoPosition.countryCode"
        label="Select City"
    >
    </v-autocomplete>
</template>

<script lang="ts" setup>
import { computed, defineEmits, onMounted, defineProps } from 'vue'
import { useStore } from 'vuex'

const props = defineProps<{
    modelValue: {
        countryCode: string,
        cityCode: string,
    }
}>()

const emits = defineEmits(['update:model-value'])

const geoPosition = computed({
    get() {
        return props.modelValue
    },
    set(val) {
        emits('update:model-value', val)
    }
}
)

const store = useStore()

const countries = computed(() => store.state.geo.countries)

const cities = computed(() => store.state.geo.cities)

onMounted(() => {
    store.dispatch('geo/getCountries')
})

const getCities = () => {
    store.dispatch('geo/getCities', geoPosition.value.countryCode)
}
</script>