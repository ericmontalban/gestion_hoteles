<script setup>

import { ref, onMounted } from 'vue';
import { useRoute } from "vue-router";
import useHotelesStore from "../../store/hoteles.js";
import useHabitacionesStore from "../../store/habitaciones.js";

const route = useRoute();
const hotelesStore = useHotelesStore();
const habitacionesStore = useHabitacionesStore();
const errorMessage = ref("");
const hotelId = route.params.id; // Obtener el ID del hotel de la URL

const hotel = ref({}); // para asignar los valores del hotel en onMounted
const nuevaHabitacion = ref({
    numero: "",
    tipo: "",
    precio_por_noche: 0
})

onMounted(async() => {
    await hotelesStore.getHoteles();
    hotel.value = hotelesStore.hoteles.find(h => h.id === parseInt(hotelId));

    // Verificar si el hotel se encuentra
    if (hotel.value) {
        console.log('Hotel cargado:', hotel.value);  // Esto te permite verificar los datos
    } else {
        console.error('Hotel no encontrado con ID:', hotelId);
    }

    await habitacionesStore.getHabitaciones(hotelId);
});

async function agregarHabitacion () {
  /*
    if (!nuevaHabitacion.value.numero || !nuevaHabitacion.value.precio_por_noche) {
        errorMessage.value = "Por favor, rellena al menos el número de habitación y el precio por noche.";
        return;
    }
    */
    await habitacionesStore.addHabitacion(hotelId, nuevaHabitacion.value);
    // nuevaHabitacion.value = { numero: "", tipo: "", precio: 0 }; // Resetear el formulario
}

async function eliminarHabitacion (habitacionId) {
    await habitacionesStore.deleteHabitacion(hotelId, habitacionId);
}
</script>

<template>
    <div class="container mx-auto p-4">
      <h2 v-if="hotel.value" class="text-2xl font-bold mb-4">Editar Hotel: {{ hotel.value.nombre }}</h2>

      <!-- Formulario para agregar una habitación -->
      <div class="mb-4">
        <h3 class="text-xl">Agregar Habitacion</h3>

        <div v-if="errorMessage" class="mt-4 mb-4 py-2 px-3 rounded text-white bg-red-400">
          {{errorMessage}}
        </div>

        <form @submit.prevent="agregarHabitacion" class="space-y-4">
          <input v-model="nuevaHabitacion.numero" placeholder="Número de habitación" class="border p-2 w-full" />
          <input v-model="nuevaHabitacion.tipo" placeholder="Tipo de habitación" class="border p-2 w-full" />
          <input v-model="nuevaHabitacion.precio_por_noche" type="number" placeholder="Precio" class="border p-2 w-full" />
  
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Agregar Habitacion</button>
        </form>
      </div>
    </div>
</template>