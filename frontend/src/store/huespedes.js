import { defineStore } from "pinia";
import axiosClient from "../axios";

const useHuespedesStore = defineStore("huespedes", {
    state: () => ({
        huespedes: [],
        loading: false
    }),

    actions: {
        async getHuespedes(idHotel, idHabitacion) {
            this.loading = true;
            const response = await axiosClient.get(`/api/hoteles/${idHotel}/habitaciones/${idHabitacion}/huespedes`);
            this.huespedes = response.data;
            this.loading = false;
        },

        async addHuespedes(idHotel, idHabitacion, nuevoHuesped) {
            const response = await axiosClient.post(`/api/hoteles/${idHotel}/habitaciones/${idHabitacion}/huespedes`, nuevoHuesped);
            this.huespedes.push(response.data);
        },

        async updateHuesped() {

        },

        async deleteHuesped(idHotel, idHabitacion, idHuesped) {
            await axiosClient.delete(`/api/hoteles/${idHotel}/habitaciones/${idHabitacion}/huespedes/${idHuesped}`);
            this.huespedes = this.huespedes.filter(huesped => huesped.id !== idHuesped);
        }
    }
});

export default useHuespedesStore;


