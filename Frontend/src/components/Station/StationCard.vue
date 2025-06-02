<template>
  <div class="p-4 border rounded shadow bg-white">
    <h2 class="text-xl font-semibold">{{ station.name }}</h2>
    <p>Status: {{ station.status }}</p>
    <p>Power Output: {{ station.powerOutput }} kW</p>
    <p>Connector: {{ station.connectorType }}</p>
    <p>Location: {{ station.latitude }}, {{ station.longitude }}</p>

    <div class="mt-2 flex gap-2">
      <button @click="$emit('edit', station)" class="text-blue-600 hover:underline">Edit</button>
      <button @click="$emit('delete', station._id)" class="text-red-600 hover:underline">Delete</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  station: Object,
})
</script>
