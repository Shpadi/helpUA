import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import SignUp from '../views/SignUpView.vue'
import SignIn from '../views/SignInView.vue'
import Dating from '../views/DatingView.vue'
import Help from '../views/HelpView.vue'
import DatingForm from '../views/Dating/DatingForm.vue'
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
    path: '/dating',
    name: 'dating',
    component: Dating,
    meta: { requiresAuth: true }
  },
  {
    path: '/dating-new-profile',
    name: 'dating-form',
    component: DatingForm,
    meta: { requiresAuth: true }
  },
  {
    path: '/help',
    name: 'help',
    component: Help,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const user = localStorage.getItem('crd')
  const accessToken = user ? JSON.parse(user).stsTokenManager.accessToken : null
  if (to.meta.requiresAuth && !accessToken) next({ name: 'login' })
  if (to.meta.disabledAdterLogin && accessToken) next({ name: 'home' })
  next()
})

export default router
