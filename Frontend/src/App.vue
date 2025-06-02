<template>
  <div id="app">
    <!-- Show Navbar only if route is NOT /login or /register -->
    <Navbar />

    <!-- router view renders current page -->
    <router-view />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './pages/Navbar.vue'

const route = useRoute()

const showNavbar = computed(() => {
  return route.path !== '/login' && route.path !== '/register'
})

</script>
