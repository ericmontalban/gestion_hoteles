import { defineStore } from "pinia";
import axiosClient from "../axios";

const useHabitacionesStore = defineStore("habitaciones", {
    state: () => ({
        habitaciones: [],
        loading: false
    }),

    actions: {
        async getHabitaciones(idHotel) {
            this.loading = true;
            const response = await axiosClient.get(`/api/hoteles/${idHotel}/habitaciones`);
            this.habitaciones = response.data;
            this.loading = false;
        },

        async addHabitacion(idHotel, nuevaHabitacion) {
            const response = await axiosClient.post(`/api/hoteles/${idHotel}/habitaciones`, nuevaHabitacion);
            this.habitaciones.push(response.data);
        },

        async updateHabitacion() {

        },

        async deleteHabitacion(idHotel, idHabitacion) {
            await axiosClient.delete(`/api/hoteles/${idHotel}/habitaciones/${idHabitacion}`);
            this.habitaciones = this.habitaciones.filter(habitacion => habitacion.id !== idHabitacion);
        }
    }
});

export default useHabitacionesStore;