<script setup>
import { onMounted } from "vue";
import useHotelesStore from "../../store/hoteles.js"; // Mantiene el mismo estilo que el userStore
import router from "../../router.js"

const hotelesStore = useHotelesStore(); // Obtenemos el store de pinia

// Cargar hoteles al montar el componente, es decir, al entrar en la página /hoteles
// Usa hoteles.js de pinia
onMounted(() => {
    hotelesStore.getHoteles();
});

// Función para eliminar un hotel
const eliminarHotel = (id) => {
    if (confirm("¿Seguro que quieres eliminar este hotel?")) {
        hotelesStore.deleteHotel(id);
    }
};

// Función para redirigir a la vista de edición
const editarHotel = (id) => {
    router.push(`/hoteles/${id}/habitaciones`);
};
</script>

<template>
  <div class="container mx-auto p-4">
    <!-- Mensaje de carga -->
    <div v-if="hotelesStore.loading" class="text-center text-gray-500">
      Cargando hoteles...
    </div>

    <div v-else>
      <div class="flex flex-col justify-center items-center gap-4 mb-4">
        <h2 class="text-3xl font-bold">Hoteles</h2>
        <!-- Botón para agregar un nuevo hotel -->
          <router-link
            to="/hoteles/nuevo"
            class="inline-flex items-center bg-blue-500 text-white px-4 py-2 rounded shadow 
                  hover:bg-blue-600 transition-colors duration-300"
          >
          <!-- Pequeño ícono de "más" (ejemplo con Heroicons) -->
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
          Agregar Hotel
        </router-link>
      </div>
      
      <!-- Si hay hoteles registrados mostrar listado de hoteles -->
      <div v-if="hotelesStore.hoteles.length > 0" class="mt-6 grid grid-cols-4 gap-4">
        <div v-for="hotel in hotelesStore.hoteles" :key="hotel.id" class="p-4 border mb-2 rounded shadow flex flex-col items-center text-center">
          <h3 class="text-lg font-semibold">{{ hotel.nombre }}</h3>
          <p>{{ hotel.direccion }}</p>
          <p><strong>Teléfono:</strong> {{ hotel.telefono }}</p>

          <!-- Botones de acción -->
          <div class="mt-2">
            <button @click="editarHotel(hotel.id)" class="bg-blue-500 text-white px-4 py-2 rounded w-24 mr-2 hover:bg-blue-600">
              Editar
            </button>
            <button @click="eliminarHotel(hotel.id)" class="bg-red-500 text-white px-4 py-2 rounded w-24 hover:bg-red-600">
              Eliminar
            </button>
          </div>
        </div>
      </div>

      <!-- Si no hay hoteles registrados -->
      <p v-else class="text-center text-gray-500">No hay hoteles registrados.</p>

    </div>
  </div>
</template>
