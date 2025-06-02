import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../pages/LoginPage.vue'
import RegisterPage from '../pages/RegisterPage.vue'
import StationMap from '../pages/StationMapPage.vue'
import Dashboard from '../pages/Dashboard.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/map', component: StationMap, meta: { requiresAuth: true } },
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) {
    alert('Not authenticated! Please login first.')
    next({ path: '/login' })
  } else {
    next()
  }
})



export default router
