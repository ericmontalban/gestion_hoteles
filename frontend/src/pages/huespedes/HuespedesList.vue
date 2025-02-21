<script setup>

import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import router from "../../router.js"
import useHuespedesStore from "../../store/huespedes.js";
import useHabitacionesStore from "../../store/habitaciones.js";

const route = useRoute();
const habitacionesStore = useHabitacionesStore();
const huespedesStore = useHuespedesStore();
const hotelId = route.params.id;
const habitacionId = route.params.habitacionId; // Obtener el ID del hotel de la URL
const numeroHabitacion = ref("");

onMounted(async() => {
    huespedesStore.loading = true;
    await habitacionesStore.getHabitaciones(hotelId);
    const habitacion = habitacionesStore.habitaciones.find(habitacion => habitacion.id === parseInt(habitacionId));
    numeroHabitacion.value = habitacion.numero;
    await huespedesStore.getHuespedes(hotelId, habitacionId);
});

async function eliminarHuesped(huespedId) {
    console.log("hotel " + hotelId + "habitacion " + habitacionId + "huesped " + huespedId);
    await huespedesStore.deleteHuesped(hotelId, habitacionId, huespedId);
}

</script>

<template>
    <div class="container mx-auto p-4">
      <!-- Mostrar mensaje de carga primero -->
      <div v-if="huespedesStore.loading" class="text-center text-gray-500">
        Cargando huéspedes...
      </div>
  
      <!-- Solo mostrar contenido si la carga ha terminado -->
      <div v-else>
        <h2 class="text-2xl font-bold mb-4">Habitación {{ numeroHabitacion }}</h2>
  
        <!-- Botón para volver a la lista de habitaciones del hotel -->
        <router-link :to="`/hoteles/${hotelId}/habitaciones`" class="block mt-4 text-center bg-blue-500 text-white px-4 py-2 rounded">
          Volver a Habitaciones
        </router-link>
  
        <!-- Botón para agregar una nueva habitación -->
        <router-link :to="`/hoteles/${hotelId}/habitaciones/${habitacionId}/huespedes/nuevo`" class="block mt-4 mb-2 text-center bg-blue-500 text-white px-4 py-2 rounded">
          Agregar Huésped
        </router-link>
  
        <!-- Si hay huéspedes, los muestra -->
        <div v-if="huespedesStore.huespedes.length > 0">
          <div v-for="huesped in huespedesStore.huespedes" :key="huesped.id" class="p-4 border mb-1 rounded shadow">
            <h3 class="text-lg font-bold">Huesped: {{ huesped.nombre }} {{ huesped.apellido }} </h3>
            <p>DNI/Pasaporte: {{ huesped.dniPasaporte }}</p> 
            <!-- Botones de acción -->
            <div class="mt-2">
              <button @click="eliminarHuesped(huesped.id)" class="bg-red-500 text-white px-4 py-2 rounded">
                Eliminar
              </button>
            </div>
          </div>
        </div>
  
        <!-- Mensaje si no hay huéspedes registrados -->
        <p v-else class="mt-3 text-center text-black-500">No hay huéspedes registrados</p>
  
      </div>
    </div>
  </template>