<script setup>


</script>

<template>
    <div class="container mx-auto p-4">
      <!-- Mostrar mensaje de carga primero -->
      <div v-if="habitacionesStore.loading" class="text-center text-gray-500">
        Cargando huéspedes...
      </div>
  
      <!-- Solo mostrar contenido si la carga ha terminado -->
      <div v-else>
        <h2 class="text-2xl font-bold mb-4">Hotel {{ nombreHotel }}</h2>
  
        <!-- Botón para volver a la lista de hoteles -->
        <router-link to="/hoteles" class="block mt-4 text-center bg-blue-500 text-white px-4 py-2 rounded">
          Volver a Habitaciones
        </router-link>
  
        <!-- Botón para agregar una nueva habitación -->
        <router-link :to="`/hoteles/${hotelId}/habitaciones/nueva`" class="block mt-4 text-center bg-blue-500 text-white px-4 py-2 rounded">
          Agregar Huésped
        </router-link>
  
        <!-- Si hay habitaciones, las muestra -->
        <div v-if="habitacionesStore.habitaciones.length > 0">
          <div v-for="habitacion in habitacionesStore.habitaciones" :key="habitacion.id" class="p-4 border mb-2 rounded shadow">
            <h3 class="text-lg font-bold">Habitacion: {{ habitacion.numero }}</h3>
            <p>Precio por noche: {{ habitacion.precio_por_noche }}€</p>
  
            <!-- Botones de acción -->
            <div class="mt-2">
              <button @click="editarHabitacion(habitacion.id)" class="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                Editar
              </button>
              <button @click="eliminarHabitacion(habitacion.id)" class="bg-red-500 text-white px-4 py-2 rounded">
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