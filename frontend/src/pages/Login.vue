<script setup>
    import axiosClient from '../axios';
    import {ref, watch} from "vue";
    import router from "../router.js"
    
    const data = ref({
        email: '',
        password: ''
    })
    
    const errorMessage = ref('')

    function submit() {
        axiosClient.get('/sanctum/csrf-cookie')
          .then(response => {
            axiosClient.post("/login", data.value)
              .then(response => {
                router.push({name: 'Home'})
              })
              .catch(error => {
                console.log(error.response)
                errorMessage.value = error.response.data.message;
              })
          });
    }
    /*
    // Ver cambios en los datos en tiempo real en la consola
    watch(data, (newValue) => {
        console.log("Datos actualizados:", newValue);
    }, { deep: true });
    */
</script>

<template>
  <section class="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
    <div class="flex flex-row w-full max-w-4xl bg-white rounded-lg shadow-lg dark:border dark:border-gray-700">
      
      <!-- Sección Izquierda (Opcional, Imagen o Texto) -->
      <div class="hidden md:flex md:w-1/2 bg-blue-600 text-white items-center justify-center p-10 rounded-l-lg">
        <h2 class="text-2xl font-bold">Bienvenido a Gestión de Hoteles</h2>
      </div>

      <!-- Sección Derecha (Formulario de Login) -->
      <div class="w-full md:w-1/2 p-8">
        <div class="flex flex-col items-center">
          <img class="w-12 h-12 mb-4" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo">
          <h2 class="text-2xl font-bold text-gray-800 dark:text-white">Iniciar Sesión</h2>
        </div>

        <div v-if="errorMessage" class="mt-4 py-2 px-3 rounded text-white bg-red-400">
          {{errorMessage}}
        </div>

        <form @submit.prevent="submit" class="mt-6 space-y-4">
          <!-- Campo Email -->
          <div>
            <label for="email" class="mb-3 block text-sm font-medium text-gray-900 dark:text-white">Correo Electrónico</label>
            <input v-model="data.email" type="email" name="email" id="email"
                   class="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                   placeholder="name@company.com" required>
          </div>

          <!-- Campo Contraseña -->
          <div>
            <label for="password" class="mb-3 block text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
            <input v-model="data.password" type="password" name="password" id="password"
                   class="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                   placeholder="••••••••" required>
          </div>

          <!-- Recordar contraseña y Olvidaste contraseña -->
          <div class="flex items-center justify-between">
            <label class="flex items-center text-gray-600 dark:text-gray-300">
              <input type="checkbox" class="mr-2"> Recuérdame
            </label>
            <a href="#" class="text-sm text-blue-500 hover:underline">¿Olvidaste tu contraseña?</a>
          </div>

          <!-- Botón Login -->
          <button type="submit"
                  class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg">
            Iniciar sesión
          </button>
          
          <!-- Link de Registro -->
          <p class="text-sm text-center text-gray-600 dark:text-gray-400">
            ¿No tienes cuenta? <a href="#" class="text-blue-500 hover:underline">Regístrate</a>
          </p>
        </form>
      </div>
    </div>
  </section>
</template>

