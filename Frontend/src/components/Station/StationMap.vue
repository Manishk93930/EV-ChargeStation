<template>
  <div class="h-full">
    <GMapMap
      :center="mapCenter"
      :zoom="zoom"
      map-type-id="roadmap"
      class="h-full w-full rounded-lg"
    >
      <GMapMarker
        v-for="station in stations"
        :key="station._id"
        :position="{ lat: station.latitude, lng: station.longitude }"
        :icon="isFocused(station) ? highlightIcon : defaultIcon"
        @click="selectedStation = station"
      >
        <GMapInfoWindow
          :opened="selectedStation && selectedStation._id === station._id"
          @closeclick="selectedStation = null"
        >
          <div
            class="bg-white text-gray-800 max-h-[50px] overflow-hidden rounded-md shadow-md px-2 pt-1 pb-2 text-xs leading-snug font-medium -mt-[5px]"
          >
            <p class="text-blue-800 font-semibold truncate">{{ station.name }}</p>
            <p class="text-gray-600">
              <span class="text-green-600">{{ station.status }}</span> |
              <span class="text-purple-600">{{ station.powerOutput }} kW</span> |
              <span class="text-pink-600">{{ station.connectorType }}</span>
            </p>
          </div>
        </GMapInfoWindow>

      </GMapMarker>
    </GMapMap>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

defineProps({
  stations: Array,
  zoom: {
    type: Number,
    default: 5,
  },
});

const route = useRoute();
const selectedStation = ref(null);

// Parse query lat/lon
const queryLat = parseFloat(route.query.lat);
const queryLon = parseFloat(route.query.lon);

// Compute center
const mapCenter = computed(() => {
  return !isNaN(queryLat) && !isNaN(queryLon)
    ? { lat: queryLat, lng: queryLon }
    : { lat: 20.5937, lng: 78.9629 };
});

// Icons
const defaultIcon = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
const highlightIcon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';

// Check if focused
const isFocused = (station) => {
  if (isNaN(queryLat) || isNaN(queryLon)) return false;
  return (
    parseFloat(station.latitude).toFixed(6) === queryLat.toFixed(6) &&
    parseFloat(station.longitude).toFixed(6) === queryLon.toFixed(6)
  );
};
</script>
