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

async function agregarHotel() {
    if (!nuevoHotel.value.nombre || !nuevoHotel.value.direccion) {
      errorMessage.value = "Por favor, rellena al menos el nombre y la dirección.";
      return;
    }
    await hotelesStore.addHotel(nuevoHotel.value); // Espera a que la API termine de registrar el hotel para no redirigir demasiado rapido
    router.push("/hoteles");
}

function cancelar() {
    router.push({name:'HotelList'});
}
</script>

<template>
  <div class="container mx-auto p-4">
    <div v-if="errorMessage" class="mt-4 py-2 px-3 rounded text-white bg-red-400">
          {{errorMessage}}
    </div>

    <form @submit.prevent="agregarHotel(nuevoHotel)" class="flex flex-col space-y-4">
      <input v-model="nuevoHotel.nombre" placeholder="Nombre del hotel" class="border p-2 w-full" />
      <input v-model="nuevoHotel.direccion" placeholder="Dirección" class="border p-2 w-full" />
      <input v-model="nuevoHotel.telefono" placeholder="Teléfono" class="border p-2 w-full" />
      <input v-model="nuevoHotel.email" placeholder="Email" class="border p-2 w-full" />
      <input v-model="nuevoHotel.sitioWeb" placeholder="Sitio Web" class="border p-2 w-full" />

      <div> 
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded w-40 mr-2">
        Añadir Hotel
        </button>

        <button @click="cancelar" class="bg-red-500 text-white px-4 py-2 rounded w-40">
        Cancelar
      </button>
      </div>
    </form>
  </div>
</template>
