// Este store (user.js) se encarga de almacenar la información 
// del usuario en el estado global de la aplicación.
import {defineStore} from "pinia";
import axiosClient from "../axios";

const useUserStore = defineStore('user', {
    state: () => ({ // Define el estado del usuario en la aplicación
        user:null
    }),
    actions: {
        fetchUser() {
            return axiosClient.get('/api/user')
                    .then(({data}) => {
                        console.log(data);
                        this.user = data;
                    });
        }
    }
})

export default useUserStore;