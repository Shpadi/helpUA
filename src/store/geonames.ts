import axios from 'axios'


const state = {
    countries: [],
    cities: [],
}

const actions = {
    async getCountries({ commit }: any) {
        const response = await axios.get(`http://api.geonames.org/countryInfoJSON?username=helpua`)
        commit('setCountries', response.data.geonames)
    },

    async getCities({ commit }: any, countryCode: string) {
        const response = await axios.get(`http://api.geonames.org/searchJSON?country=${countryCode}&population>1000000&&maxRows=100&username=helpua`)
        commit('setCities', response.data.geonames)
    }
}

const mutations = {
    setCountries(state: any, countries: any) {
        console.log('countries', countries)
        state.countries = countries
    },
    setCities(state: any, cities: any) {
        state.cities = cities
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
}
