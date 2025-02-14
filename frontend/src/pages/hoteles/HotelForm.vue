<script setup>
// Importamos Vue, Router y Pinia
import axiosClient from '../../axios';
import { ref } from "vue";
import router from "../../router.js";
import useHotelesStore from "../../store/hoteles.js";

const hotelesStore = useHotelesStore();

// Estado reactivo para almacenar los datos del nuevo hotel
const nuevoHotel = ref({
  nombre: "",
  direccion: "",
  telefono: "",
  email: "",
  sitioWeb: "",
});

const errorMessage = ref(""); // Para almacenar errores del backend

// Función para agregar un nuevo hotel con CSRF
const agregarHotel = async () => {
  if (!nuevoHotel.value.nombre || !nuevoHotel.value.direccion) {
    errorMessage.value = "Por favor, rellena al menos el nombre y la dirección.";
    return;
  }

  try {
    /*
    // 1. Obtener la cookie CSRF antes de hacer la solicitud
    await axiosClient.get("/sanctum/csrf-cookie");
    */
    // 2️. Enviar los datos del hotel al backend
    await axiosClient.post("/api/hoteles", nuevoHotel.value);

    // 3️. Redirigir a la lista de hoteles después de crear
    router.push("/hoteles");
  } catch (error) {
    console.error("Error al agregar hotel:", error.response);
    errorMessage.value = error.response?.data?.message || "Error al agregar el hotel.";
  }
};
</script>

<template>
  <div class="container mx-auto p-4">
    <h2 class="text-2xl font-bold mb-4">Agregar Nuevo Hotel</h2>

    <div v-if="errorMessage" class="mt-4 py-2 px-3 rounded text-white bg-red-400">
          {{errorMessage}}
    </div>

    <form @submit.prevent="agregarHotel" class="space-y-4">
      <input v-model="nuevoHotel.nombre" placeholder="Nombre del hotel" class="border p-2 w-full" />
      <input v-model="nuevoHotel.direccion" placeholder="Dirección" class="border p-2 w-full" />
      <input v-model="nuevoHotel.telefono" placeholder="Teléfono" class="border p-2 w-full" />
      <input v-model="nuevoHotel.email" placeholder="Email" class="border p-2 w-full" />
      <input v-model="nuevoHotel.sitioWeb" placeholder="Sitio Web" class="border p-2 w-full" />

      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
        Agregar Hotel
      </button>
    </form>
  </div>
</template>
