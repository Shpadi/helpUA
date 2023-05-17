import { createStore } from 'vuex'
import authModule from '@/store/auth'

export default createStore({
  modules: {
    auth: authModule
  },
})
