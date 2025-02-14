// Este store (hoteles.js) se encarga de almacenar la información de los hoteles
// en el estado global de la aplicación y manejar las peticiones a la API.
import { defineStore } from "pinia";
import axiosClient from "../axios"; // Se usa el mismo cliente de Axios configurado

const useHotelesStore = defineStore("hoteles", {
    state: () => ({ 
        // Define el estado global de los hoteles en la aplicación
        hoteles: [], // Lista de hoteles obtenidos desde la API
        loading: false, // Indicador de carga para evitar llamadas múltiples
    }),
    
    actions: {
        // Método para obtener la lista de hoteles desde la API
        // Read de CRUD
        async fetchHoteles() {
            this.loading = true; // Activar loading
            try {
                const response = await axiosClient.get("/api/hoteles"); // solicitar a la api los hoteles
                console.log("Hoteles obtenidos:", response.data); 
                this.hoteles = response.data; // Guardar los datos en el estado de pinia
            } catch (error) {
                console.error("Error obteniendo hoteles:", error);
            } finally {
                this.loading = false; // Desactivar loading
            }
        },

        // Método para agregar un nuevo hotel
        addHotel(nuevoHotel) {
            return axiosClient.post('/api/hoteles', nuevoHotel)
                .then(({ data }) => {
                    console.log("Hotel agregado:", data);
                    this.hoteles.push(data); // Agregamos el nuevo hotel a la lista
                })
                .catch(error => {
                    console.error("Error agregando hotel:", error);
                });
        },

        // Método para actualizar un hotel existente
        updateHotel(id, datosActualizados) {
            return axiosClient.put(`/api/hoteles/${id}`, datosActualizados)
                .then(() => {
                    console.log(`Hotel ${id} actualizado.`);
                    return this.fetchHoteles(); // Recargar la lista de hoteles después de actualizar
                })
                .catch(error => {
                    console.error("Error actualizando hotel:", error);
                });
        },

        // Método para eliminar un hotel
        deleteHotel(id) {
            return axiosClient.delete(`/api/hoteles/${id}`)
                .then(() => {
                    console.log(`Hotel ${id} eliminado.`);
                    this.hoteles = this.hoteles.filter(hotel => hotel.id !== id); // Eliminamos el hotel del estado
                })
                .catch(error => {
                    console.error("Error eliminando hotel:", error);
                });
        },
    }
});

export default useHotelesStore;
