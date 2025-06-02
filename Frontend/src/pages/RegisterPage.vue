<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Create an Account</h2>
      <form @submit.prevent="handleRegister">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-0.7 focus:ring-blue-500 focus:border-blue-500"
          required
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-0.7 focus:ring-blue-500 focus:border-blue-500"
          required
        />

        <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full mt-4">Register</button>
      </form>
      <p class="text-sm mt-4 text-center">
        Already have an account?
        <router-link to="/login" class="text-blue-500 hover:underline">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import API from '@/services/api'

const email = ref('')
const password = ref('')
const router = useRouter()

const registerUser = async ({ email, password }) => {
  const res = await API.post('/auth/register', {
    email,
    password
  })
  return res.data
}

const handleRegister = async () => {
  try {
    await registerUser({ email: email.value, password: password.value })
    alert('Registration successful! Please log in.')
    router.push('/login')
  } catch (err) {
    alert(err.response?.data?.message || 'Registration failed.')
  }
}
</script>

<style scoped>
.input {
  @apply w-full p-3 mb-4 border rounded-md;
}
.btn-primary {
  @apply bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700;
}
</style>
