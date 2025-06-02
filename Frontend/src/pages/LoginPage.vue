<template>
  <div class="h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-80">
      <h1 class="text-2xl font-bold mb-6">Login</h1>
      <input v-model="email" type="email" placeholder="Email" class="mb-4 p-2 border w-full rounded" />
      <input v-model="password" type="password" placeholder="Password" class="mb-4 p-2 border w-full rounded" />
      <button @click="login" class="bg-blue-500 text-white px-4 py-2 rounded w-full">Login</button>
      
      <p class="mt-4 text-center text-sm">
        Don't have an account? 
        <router-link to="/register" class="text-blue-500 hover:underline">
          Register
        </router-link>
      </p>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import API from '../services/api'

const router = useRouter()
const email = ref('')
const password = ref('')

const login = async () => {
  try {
    const res = await API.post('/auth/login', { email: email.value, password: password.value })
    localStorage.setItem('token', res.data.token)
    router.push('/dashboard')
  } catch (err) {
    alert('Login failed')
  }
}
</script>
