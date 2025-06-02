<template>
  <div
    class="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-xl animate__animated animate__fadeInUp"
  >
    <h2 class="text-2xl font-bold text-green-700 mb-6 font-inter">
      {{ isEditing ? 'Edit Charging Station' : 'Add New Charging Station' }}
    </h2>
    <form @submit.prevent="handleSubmit" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="col-span-2">
        <input
          v-model="form.name"
          type="text"
          placeholder="Station Name"
          class="w-full px-3 py-2 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1/2 focus:ring-green-400 focus:border-green-600 transition-all duration-300"
          required
        />
      </div>
      <input
        v-model="form.latitude"
        type="number"
        step="any"
        placeholder="Latitude"
        class="w-full px-3 py-2 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1/2 focus:ring-green-400 focus:border-green-600 transition-all duration-300"
        required
      />
      <input
        v-model="form.longitude"
        type="number"
        step="any"
        placeholder="Longitude"
        class="w-full px-3 py-2 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1/2 focus:ring-green-400 focus:border-green-600 transition-all duration-300"
        required
      />
      <input
        v-model="form.powerOutput"
        type="number"
        placeholder="Power Output (kW)"
        class="w-full px-3 py-2 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1/2 focus:ring-green-400 focus:border-green-600 transition-all duration-300"
        required
      />
      <input
        v-model="form.connectorType"
        type="text"
        placeholder="Connector Type"
        class="w-full px-3 py-2 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1/2 focus:ring-green-400 focus:border-green-600 transition-all duration-300"
        required
      />
      <select
        v-model="form.status"
        class="w-full px-3 py-2 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1/2 focus:ring-green-400 focus:border-green-600 transition-all duration-300"
        required
      >
        <option disabled value="">Status</option>
        <option>Active</option>
        <option>Inactive</option>
      </select>
      <div class="col-span-2 flex gap-4">
        <button
          type="submit"
          class="flex-1 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-all duration-300"
        >
          {{ isEditing ? 'Update Station' : 'Add Station' }}
        </button>
        <button
          v-if="isEditing"
          @click.prevent="cancelEdit"
          type="button"
          class="flex-1 py-3 bg-gray-400 text-white font-semibold rounded-md hover:bg-gray-500 transition-all duration-300"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import API from '../../services/api'

const props = defineProps({
  editStation: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['refresh', 'closeEdit'])

const form = ref({
  name: '',
  latitude: '',
  longitude: '',
  powerOutput: '',
  connectorType: '',
  status: 'Active',
})

const resetForm = () => {
  form.value = {
    name: '',
    latitude: '',
    longitude: '',
    powerOutput: '',
    connectorType: '',
    status: 'Active',
  }
}

const isEditing = computed(() => props.editStation !== null)

watch(() => props.editStation, (newVal) => {
  if (newVal) {
    form.value = { ...newVal }
  } else {
    resetForm()
  }
}, { immediate: true })

const isValidLatitude = (lat) => {
  const n = parseFloat(lat)
  return !isNaN(n) && n >= -90 && n <= 90
}

const isValidLongitude = (lon) => {
  const n = parseFloat(lon)
  return !isNaN(n) && n >= -180 && n <= 180
}

const handleSubmit = async () => {
  try {
    const lat = form.value.latitude
    const lon = form.value.longitude

    if (!isValidLatitude(lat)) {
      alert('Invalid latitude. Must be between -90 and 90.')
      return
    }

    if (!isValidLongitude(lon)) {
      alert('Invalid longitude. Must be between -180 and 180.')
      return
    }

    if (isEditing.value) {
      await API.put(`/stations/${form.value._id}`, form.value)
      emit('closeEdit')
    } else {
      await API.post('/stations', form.value)
    }

    emit('refresh')
    resetForm()
  } catch (error) {
    alert('Failed to save station.')
    console.error(error)
  }
}


const cancelEdit = () => {
  emit('closeEdit')
  resetForm()
}
</script>
