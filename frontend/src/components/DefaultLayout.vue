<script setup>
import axiosClient from '../axios';
import router from "../router.js"
import useUserStore from '../store/user.js';
import { computed } from "vue";

const userStore = useUserStore()

// Obtiene el usuario actual desde el store de pinia
const user = computed(() => userStore.user) 

function logout() {
    axiosClient.post('logout') // Llama a la API de logout en el backend
      .then((response) => {
        router.push({name: 'Login'}) // // Redirige a la pantalla de login tras cerrar sesión
      })
}

</script>

<template>
  <!-- Ajustamos a pantalla completa -->
  <div class="w-full min-h-screen flex flex-col bg-grey-500">
    <!-- Barra superior -->
    <nav class="w-full bg-gray-800 text-white p-4 flex justify-between items-center">
      <span class="text-lg font-semibold">Gestión de Hoteles</span>

      <div v-if="user" class="flex items-center space-x-4">
        <span class="text-sm">{{ user.name }}</span>
        <button 
          @click="logout" 
          class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Cerrar sesión
        </button>
      </div>
    </nav>

    <!-- Contenido principal -->
    <main class="flex-grow w-full px-8 py-6">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>

nav a {
  text-decoration: none;
  font-weight: bold;
  color: #333;
}

nav a:hover {
  color: #007bff;
}

</style>
