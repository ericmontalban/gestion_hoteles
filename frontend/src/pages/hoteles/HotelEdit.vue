<script setup>

import { ref, onMounted } from 'vue';
import { useRoute } from "vue-router";
import router from "../../router.js"
import useHotelesStore from "../../store/hoteles.js";
import useHabitacionesStore from "../../store/habitaciones.js";

const route = useRoute();
const hotelesStore = useHotelesStore();
const habitacionesStore = useHabitacionesStore();
const hotelId = route.params.id; // Obtener el ID del hotel de la URL

const nombreHotel = ref("");

onMounted(async() => {
    habitacionesStore.loading = true; // Asegurar que loading empieza en true para que se muestre el loading al cargar el componente
    await hotelesStore.getHoteles();
    const hotel = hotelesStore.hoteles.find(hotel => hotel.id === parseInt(hotelId)); //paseInt porque hotelId de route.params.id viene como string
    nombreHotel.value = hotel.nombre;
    await habitacionesStore.getHabitaciones(hotelId);
});

async function editarHabitacion(idHabitacion) {
    router.push(`/hoteles/${hotelId}/habitaciones/${idHabitacion}/huespedes`);
}

async function eliminarHabitacion (habitacionId) {
    await habitacionesStore.deleteHabitacion(hotelId, habitacionId);
}
</script>

<template>
  <div class="container mx-auto p-4">
    <!-- Mostrar mensaje de carga primero -->
    <div v-if="habitacionesStore.loading" class="text-center text-gray-500">
      Cargando habitaciones...
    </div>

    <!-- Solo mostrar contenido si la carga ha terminado -->
    <div v-else>
      <div class="flex flex-col justify-center items-center mb-8">
        <h2 class="text-3xl font-bold mb-4 text-center">Hotel {{ nombreHotel }}</h2>
          <div class="flex flex-row gap-4">
            <!-- Botón para volver a la lista de hoteles -->
            <router-link to="/hoteles" class="w-56 mt-4 text-center bg-blue-500 text-white px-4 py-2 rounded">
              Volver a Hoteles
            </router-link>

            <!-- Botón para agregar una nueva habitación -->
            <router-link :to="`/hoteles/${hotelId}/habitaciones/nueva`" class="flex justify-center items-center w-56 mt-4 text-center bg-blue-500 text-white px-4 rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              
              Agregar Habitación
            </router-link>
          </div>
      </div>

      <!-- Si hay habitaciones, las muestra -->
      <div v-if="habitacionesStore.habitaciones.length > 0" class="mt-6 grid grid-cols-4 gap-4">
        <div v-for="habitacion in habitacionesStore.habitaciones" :key="habitacion.id" class="p-4 border mb-2 rounded shadow text-center">
          <h3 class="text-lg font-bold">Habitacion: {{ habitacion.numero }}</h3>
          <p>Precio por noche: {{ habitacion.precio_por_noche }}€</p>

          <!-- Botones de acción -->
          <div class="mt-2">
            <button @click="editarHabitacion(habitacion.id)" class="bg-blue-500 text-white px-4 py-2 rounded mr-2 w-24">
              Editar
            </button>
            <button @click="eliminarHabitacion(habitacion.id)" class="bg-red-500 text-white px-4 py-2 rounded w-24">
              Eliminar
            </button>
          </div>
        </div>
      </div>

      <!-- Mensaje si no hay habitaciones -->
      <p v-else class="mt-3 text-center text-black-500">No hay habitaciones registradas</p>

    </div>
  </div>
</template>
