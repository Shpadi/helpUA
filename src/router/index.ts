import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import SignUp from '../views/SignUpView.vue'
import SignIn from '../views/SignInView.vue'
import Tinder from '../views/TinderView.vue'
import TinderForm from '../views/Tinder/TinderForm.vue'
import HomeView from '@/views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: SignIn,
    meta: { disabledAdterLogin: true }
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: SignUp,
    meta: { disabledAdterLogin: true }
  },
  {
    path: '/tinder',
    name: 'tinder',
    component: Tinder,
    meta: { requiresAuth: true }
  },
  {
    path: '/tinder-new-profile',
    name: 'tinder-form',
    component: TinderForm,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const user = localStorage.getItem('crd')
  const apiKey = user ? JSON.parse(user).apiKey : null
  if (to.meta.requiresAuth && !apiKey) next({ name: 'login' })
  if (to.meta.disabledAdterLogin && apiKey) next({ name: 'home' })
  next()
})

export default router
