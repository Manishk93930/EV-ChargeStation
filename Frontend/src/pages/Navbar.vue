<template>
  <nav class="bg-white shadow-md px-6 py-4 flex justify-between items-center border-b border-green-500">
    <div class="flex items-center gap-3">
      <img src="/ev-icon.png" alt="EV Logo" class="h-9 w-9" />
      <h1 class="text-2xl font-bold text-emerald-600 tracking-tight">EV Charger App</h1>
    </div>
    <button
      v-if="showSignOut" 
      @click="handleSignOut"
      class="bg-red-500 text-white hover:bg-emerald-600 px-3 py-1 rounded-lg font-semibold transition duration-200 shadow-sm"
    >
      Sign Out
    </button>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const router = useRouter()

const handleSignOut = () => {
  localStorage.removeItem('token')
  router.push('/login')
}

const showSignOut = computed(() => {
  return route.path !== '/login' && route.path !== '/register'
})
</script>
