import { createStore } from 'vuex'
import authModule from '@/store/auth'
import datingModule from '@/store/dating'
import sellerModule from '@/store/seller'
import expertsModule from '@/store/experts'
import geoModule from '@/store/geonames'

export default createStore({
  modules: {
    auth: authModule,
    dating: datingModule,
    seller: sellerModule,
    experts: expertsModule,
    geo: geoModule
  },
})
