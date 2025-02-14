<script setup>
import { computed, onMounted } from "vue";
import useHotelesStore from "../../store/hoteles.js"; // Mantiene el mismo estilo que el userStore
import router from "../../router.js"

const hotelesStore = useHotelesStore();

// Estado computado para acceder a los hoteles desde Pinia
const hoteles = computed(() => hotelesStore.hoteles);
const loading = computed(() => hotelesStore.loading);

// Cargar hoteles al montar el componente
// Usa hoteles.js de pinia
onMounted(() => {
    hotelesStore.fetchHoteles();
});

// Función para eliminar un hotel
const eliminarHotel = (id) => {
    if (confirm("¿Seguro que quieres eliminar este hotel?")) {
        hotelesStore.deleteHotel(id);
    }
};

// Función para redirigir a la vista de edición
const editarHotel = (id) => {
    router.push(`/hoteles/editar/${id}`);
};
</script>

<template>
  <div class="container mx-auto p-4">
    <h2 class="text-2xl font-bold mb-4">Gestión de Hoteles</h2>

    <!-- Mensaje de carga -->
    <div v-if="loading" class="text-center text-gray-500">Cargando hoteles...</div>

    <!-- Listado de hoteles -->
    <div v-else-if="hoteles.length > 0">
      <div v-for="hotel in hoteles" :key="hotel.id" class="p-4 border mb-2 rounded shadow">
        <h3 class="text-lg font-semibold">{{ hotel.nombre }}</h3>
        <p>{{ hotel.direccion }}</p>
        <p><strong>Teléfono:</strong> {{ hotel.telefono }}</p>

        <!-- Botones de acción -->
        <div class="mt-2">
          <button @click="editarHotel(hotel.id)" class="bg-yellow-500 text-white px-4 py-2 rounded mr-2">
            Editar
          </button>
          <button @click="eliminarHotel(hotel.id)" class="bg-red-500 text-white px-4 py-2 rounded">
            Eliminar
          </button>
        </div>
      </div>
    </div>

    <!-- Botón para agregar un nuevo hotel -->
    <router-link to="/hoteles/nuevo" class="block mt-4 text-center bg-blue-500 text-white px-4 py-2 rounded">
      Agregar Hotel
    </router-link>
  </div>
</template>
