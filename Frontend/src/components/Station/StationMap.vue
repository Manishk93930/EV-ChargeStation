<template>
  <div class="h-full">
    <LMap :zoom="zoom" :center="[mapCenter.lat, mapCenter.lon]" class="h-full rounded-lg">
      <LTileLayer :url="tileLayer" />

      <!-- Render all stations, change icon only if it's the focused one -->
      <LMarker
        v-for="station in stations"
        :key="station._id"
        :lat-lng="[station.latitude, station.longitude]"
        :icon="isFocused(station) ? highlightIcon : defaultIcon"
      >
        <LPopup>
          <strong>{{ station.name }}</strong><br />
          {{ station.status }} | {{ station.powerOutput }} kW | {{ station.connectorType }}
        </LPopup>
      </LMarker>
    </LMap>
  </div>
</template>

<script setup>
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet'

defineProps({
  stations: Array,
  zoom: {
    type: Number,
    default: 5,
  },
})

const route = useRoute()

// Parse query center
const queryLat = parseFloat(route.query.lat)
const queryLon = parseFloat(route.query.lon)

// Calculate map center
const mapCenter = computed(() => {
  return !isNaN(queryLat) && !isNaN(queryLon)
    ? { lat: queryLat, lon: queryLon }
    : { lat: 20.5937, lon: 78.9629 }
})

// Leaflet tile layer
const tileLayer = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

// Default marker icon (blue)
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

// Highlight icon (red 📍)
const highlightIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [32, 48],
  iconAnchor: [16, 48],
  popupAnchor: [1, -34],
})

// Helper to check if this station is the focused one
const isFocused = (station) => {
  if (isNaN(queryLat) || isNaN(queryLon)) return false
  return (
    parseFloat(station.latitude).toFixed(6) === queryLat.toFixed(6) &&
    parseFloat(station.longitude).toFixed(6) === queryLon.toFixed(6)
  )
}
</script>
