<script setup>
import axiosClient from '../axios';
import {ref, watch} from "vue";
import router from "../router.js"

const data = ref({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
});

const errors = ref({}); // Objeto para almacenar los errores de validación

function submit() {
    axiosClient.get('/sanctum/csrf-cookie')
        .then(response => {
            axiosClient.post("/register", data.value)
                .then(response => {
                    router.push({name: 'HotelList'}) 
                })
                .catch(error => {
                    if (error.response && error.response.data.errors) {
                        errors.value = error.response.data.errors; // Capturar los errores de validación
                    }
                })
        });
}

// Esta función se usa por si el usuario que va a registrarse ya tiene una cuenta
function goToLogin() { 
    router.push({ name: 'Login' }); // Redirige a /login
}
/*
// Ver cambios en los datos en tiempo real en la consola
watch(data, (newValue) => {
    console.log("Datos actualizados:", newValue);
}, { deep: true });
*/
</script>

<template>
    <section class="bg-gray-50 dark:bg-gray-900">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                  Crear una cuenta
              </h1>
              <form @submit.prevent="submit" class="space-y-4 md:space-y-6">
                  <div>
                      <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                      <input v-model="data.name" type="name" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
                      <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name[0] }}</p>
                  </div>
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                      <input v-model="data.email" type="email" name="email" id="email" placeholder="name@company.com" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email[0] }}</p>
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                      <input v-model="data.password" type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password[0] }}</p>
                  </div>
                  <div>
                      <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirmar contraseña</label>
                      <input v-model="data.password_confirmation" type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <p v-if="errors.password_confirmation" class="text-red-500 text-sm mt-1">{{ errors.password_confirmation[0] }}</p>
                  </div>
                  
                  <div class="flex items-start">
                      <div class="flex items-center h-5">
                        <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="">
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="terms" class="font-light text-gray-500 dark:text-gray-300">Acepto los <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Términos y Condiciones</a></label>
                      </div>
                  </div>
                  
                  <button type="submit" class="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    Registrar
                  </button>
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Ya tienes una cuenta?
                      <a @click.prevent="goToLogin" class="cursor-pointer font-medium text-primary-600 hover:underline dark:text-primary-500">
                            Inicia sesión aquí
                      </a>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
</template>

<style scoped>

</style>