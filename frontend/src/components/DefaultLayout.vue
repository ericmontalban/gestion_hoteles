<script setup>
</script>

<template>
  <div>
    <nav class="p-4 bg-gray-200">
      <router-link to="/" class="mr-4">Inicio</router-link>
      <router-link to="/images" class="mr-4">Mis Imágenes</router-link>
      <router-link to="/login" class="mr-4">Iniciar Sesión</router-link>
      <router-link to="/signup">Registrarse</router-link>
    </nav>
    <RouterView />
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
