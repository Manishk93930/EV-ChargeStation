<template>
  <div class="relative h-screen w-full bg-gray-900 text-white">
    <!-- Header -->
    <header class="absolute top-0 left-0 w-full z-20 p-6 bg-gradient-to-r from-emerald-600 to-green-500 shadow-lg">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl md:text-3xl font-bold tracking-wide">⚡ EV ChargeMap</h1>
        <p class="text-sm text-white/80 hidden md:block">Locate nearby EV charging stations in real-time</p>
      </div>
    </header>

    <!-- Map Section -->
    <div class="pt-24 h-full animate__animated animate__fadeIn">
      <!-- Use StationMap component and pass props -->
      <StationMap :stations="stations" :center="[centerLat, centerLon]" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import API from '@/services/api'
import { useRoute } from 'vue-router'
import StationMap from '../components/Station/StationMap.vue'

const route = useRoute()
const mapRef = ref(null)
const stations = ref([])
const token = localStorage.getItem('token')
const tileLayer = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

// Center fallback (India)
const centerLat = ref(20.5937)
const centerLon = ref(78.9629)

onMounted(async () => {
  const res = await API.get('/stations', {
    headers: { Authorization: `Bearer ${token}` },
  })
  stations.value = res.data

  // If lat/lon is passed via query, use it to center the map
  const queryLat = parseFloat(route.query.lat)
  const queryLon = parseFloat(route.query.lon)
  console.log("Latitude taken from query",queryLat)
  console.log("Longitude taken from query",queryLon)
  if (!isNaN(queryLat) && !isNaN(queryLon)) {
    centerLat.value = queryLat
    centerLon.value = queryLon
  }
})
</script>
