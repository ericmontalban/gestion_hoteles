<script setup>
import router from "../../router.js"
import { useRoute } from "vue-router";
import { ref } from "vue";
import useHuespedesStore from "../../store/huespedes.js";

const route = useRoute(); 
const idHotel = route.params.id;
const idHabitacion = route.params.habitacionId;
const huespedesStore = useHuespedesStore();

const nuevoHuesped = ref({
    nombre: "",
    apellido: "",
    dniPasaporte: "",
    fecha_check_in: "",
    fecha_check_out: "",
});

async function agregarHuesped() {
    await huespedesStore.addHuesped(idHotel, idHabitacion, nuevoHuesped.value);
    router.push(`/hoteles/${idHotel}/habitaciones/${idHabitacion}/huespedes`);
}
</script>

<template>

   <div class="container mx-auto p-4">
       <form @submit.prevent="agregarHuesped" class="space-y-4">
            <input v-model="nuevoHuesped.nombre" placeholder="Nombre" class="border p-2 w-full">
            <input v-model="nuevoHuesped.apellido" placeholder="Apellido" class="border p-2 w-full">
            <input v-model="nuevoHuesped.dniPasaporte" placeholder="DNI/Pasaporte" class="border p-2 w-full">
            <div class="relative">
                <input
                    type="date"
                    id="fechaCheckIn"
                    v-model="nuevoHuesped.fecha_check_in"
                    class="w-full px-3 py-2 border rounded-lg appearance-none focus:outline-none peer"
                />
                <label
                    for="fechaCheckIn"
                    class="absolute left-1 top-2 text-gray-400 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-focus:top-[-10px] peer-focus:text-sm peer-focus:text-blue-500 bg-white px-1"
                    v-if="!nuevoHuesped.fecha_check_in"
                >
                Fecha check-in
                </label>
            </div>
            
            <div class="relative">
                <input
                    type="date"
                    id="fechaCheckOut"
                    v-model="nuevoHuesped.fecha_check_out"
                    class="w-full px-3 py-2 border rounded-lg appearance-none focus:outline-none peer"
                />
                <label
                    for="fechaCheckOut"
                    class="absolute left-1 top-2 text-gray-400 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-focus:top-[-10px] peer-focus:text-sm peer-focus:text-blue-500 bg-white px-1"
                    v-if="!nuevoHuesped.fecha_check_out"
                >
                Fecha check-out
                </label>
            </div>
            <button type="submit" class="bg-blue-500 text-white rounded">Agregar huesped</button>
       </form> 

   </div>

</template>