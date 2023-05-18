import { createStore } from 'vuex'
import authModule from '@/store/auth'
import datingModule from '@/store/dating'

export default createStore({
  modules: {
    auth: authModule,
    dating: datingModule,
  },
})
