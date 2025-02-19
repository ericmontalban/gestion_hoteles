<script setup>

import { ref, onMounted } from 'vue';
import { useRoute } from "vue-router";
import router from "../../router.js";
import useHabitacionesStore from "../../store/habitaciones.js";

const route = useRoute();
const habitacionesStore = useHabitacionesStore();
const hotelId = route.params.id; // Obtener el ID del hotel de la URL

const errorMessage = ref("");

const successMessage = ref("");

const nuevaHabitacion = ref({
    numero: "",
    tipo: "",
    precio_por_noche: 0
})

async function agregarHabitacion () {
  /*
    if (!nuevaHabitacion.value.numero || !nuevaHabitacion.value.precio_por_noche) {
        errorMessage.value = "Por favor, rellena al menos el número de habitación y el precio por noche.";
        return;
    }
    */
    await habitacionesStore.addHabitacion(hotelId, nuevaHabitacion.value);
    successMessage.value = "Habitación agregada con éxito";
    setTimeout(() => {
        router.push(`/hoteles/${hotelId}/habitaciones`);
    }, 1000)
}
</script>

<template>
    <div class="container mx-auto p-4">
        <!-- Formulario para agregar una habitación -->
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
    <div v-if="successMessage" class="mt-4 mb-4 py-2 px-3 rounded text-white bg-green-400">
            {{ successMessage }}
    </div>
</template>