import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import SignUp from '../views/SignUpView.vue'
import SignIn from '../views/SignInView.vue'
import Dating from '../views/DatingView.vue'
import DatingForm from '../views/Dating/DatingForm.vue'
import Seller from '../views/SellerView.vue'
import SellerForm from '../views/Seller/SellerForm.vue'
import Experts from '../views/ExpertsView.vue'
import ExpertsForm from '../views/Experts/ExpertsForm.vue'
import Help from '../views/HelpView.vue'
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
    path: '/seller',
    name: 'seller',
    component: Seller,
    meta: { requiresAuth: true }
  },
  {
    path: '/seller-new-profile',
    name: 'seller-form',
    component: SellerForm,
    meta: { requiresAuth: true }
  },
  {
    path: '/experts',
    name: 'experts',
    component: Experts,
    meta: { requiresAuth: true }
  },
  {
    path: '/experts-new-profile',
    name: 'experts-form',
    component: ExpertsForm,
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
