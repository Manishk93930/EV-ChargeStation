<template>
  <div class="p-6 space-y-10 bg-gray-100 min-h-screen font-sans">
    <!-- Title -->
    <h1 class="text-3xl text-emerald-700 tracking-tight font-sans">
      ⚡ Charging Stations Dashboard
    </h1>

    <!-- Form -->
    <div ref="formRef">
      <StationForm
        @refresh="fetchStations"
        :editStation="editingStation"
        @closeEdit="cancelEdit"
      />
    </div>

    <!-- All Stations + Filters -->
    <div
      class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-200"
    >
      <h2 class="text-2xl font-semibold text-gray-800">🔌 Charging Stations</h2>
      <div class="flex flex-col md:flex-row gap-4 w-full md:w-auto">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            v-model="filters.status"
            class="w-full md:w-40 p-2 border border-gray-300 rounded-md font-inter shadow-sm focus:ring-emerald-400 focus:border-emerald-400"
          >
            <option value="">All</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Connector</label>
          <input
            v-model="filters.connectorType"
            placeholder="e.g., Type2"
            class="w-full md:w-40 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-400 focus:border-emerald-400"
          />
        </div>
      </div>
    </div>

    <!-- Station Table -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-emerald-100">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Name
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Location
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Status
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Connector
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              View in Map
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="station in filteredStations" :key="station._id">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ station.name }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
              {{
                resolvedLocations[station._id] ||
                `${station.latitude.toFixed(4)}, ${station.longitude.toFixed(4)}`
              }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
              <span
                :class="{
                  'text-green-600 font-semibold': station.status === 'Active',
                  'text-red-500 font-semibold': station.status === 'Inactive',
                }"
              >
                {{ station.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
              {{ station.connectorType }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
              <button
                @click="handleView(station)"
                class="text-indigo-600 hover:underline"
              >
                View
              </button>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm space-x-2">
              <button
                @click="handleEdit(station)"
                class="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                @click="handleDelete(station._id)"
                class="text-red-600 hover:underline"
              >
                Delete
              </button>
            </td>
          </tr>
          <tr v-if="filteredStations.length === 0">
            <td colspan="6" class="px-6 py-4 text-center text-gray-500">
              No stations found.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Map -->
    <div class="rounded-xl overflow-hidden shadow-lg border border-gray-200">
      <StationMap :stations="stations" :center="[0, 0]" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, nextTick } from 'vue'
import axios from 'axios'
import API from '../services/api'
import StationForm from '../components/Station/StationForm.vue'
import StationMap from '../components/Station/StationMap.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const stations = ref([])
const filters = ref({ status: '', connectorType: '' })
const editingStation = ref(null)
const token = localStorage.getItem('token')
const formRef = ref(null)

const resolvedLocations = ref({})

const fetchStations = async () => {
  try {
    const res = await API.get('/stations')
    stations.value = res.data
    await resolveAllLocations()
  } catch (error) {
    console.error('Error fetching stations:', error)
  }
}

const resolveAllLocations = async () => {
  for (const station of stations.value) {
    if (station.latitude != null && station.longitude != null) {
      await resolveLocation(station)
    }
  }
}

const resolveLocation = async (station) => {
  try {
    const { latitude, longitude, _id } = station
    console.log("received station",station)
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`

    const res = await axios.get(url)
    const address = res.data.address

    const city =
      address.city || address.town || address.village || address.hamlet || ''
    const state = address.state || ''

    const display =
      city && state
        ? `${city}, ${state}`
        : `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`

    resolvedLocations.value[_id] = display
  } catch (error) {
    resolvedLocations.value[station._id] = `${station.latitude.toFixed(
      4
    )}, ${station.longitude.toFixed(4)}`
  }
}

const deleteStationById = async (id) => {
  try {
    const res = await API.delete(`/stations/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return res
  } catch (error) {
    throw error
  }
}

const handleView = (station) => {
  router.push({
    path: '/map',
    query: {
      lat: station.latitude,
      lon: station.longitude,
      id: station._id,
    },
  })
}


const handleDelete = async (id) => {
  if (confirm('Are you sure you want to delete this station?')) {
    try {
      await deleteStationById(id)
      alert('Station deleted successfully')
      fetchStations()
    } catch (err) {
      alert('Failed to delete station')
      console.error(err)
    }
  }
}

const handleEdit = (station) => {
  editingStation.value = { ...station }
  nextTick(() => {
    if (formRef.value) {
      formRef.value.scrollIntoView({ behavior: 'smooth', block: 'start' })
      const firstInput = formRef.value.querySelector(
        'input, select, textarea, button'
      )
      if (firstInput) firstInput.focus()
    }
  })
}

const cancelEdit = () => {
  editingStation.value = null
}

const filteredStations = computed(() =>
  stations.value.filter(
    (s) =>
      (!filters.value.status || s.status === filters.value.status) &&
      (!filters.value.connectorType ||
        s.connectorType
          .toLowerCase()
          .includes(filters.value.connectorType.toLowerCase()))
  )
)

onMounted(fetchStations)
</script>
