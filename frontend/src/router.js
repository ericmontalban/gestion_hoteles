import { createWebHistory, createRouter } from "vue-router";
import DefaultLayout from "./components/DefaultLayout.vue"; // Asegurar que este archivo existe
import Home from "./pages/Home.vue";
import Login from "./pages/Login.vue"; 
import Signup from "./pages/Signup.vue"; 
import NotFound from "./pages/NotFound.vue";
import useUserStore from "./store/user";
import HotelList from "./pages/hoteles/HotelList.vue";
import HotelForm from "./pages/hoteles/HotelForm.vue";
import HotelEdit from "./pages/hoteles/HotelEdit.vue";
import HabitacionForm from "./pages/habitaciones/HabitacionForm.vue";
import HuespedesList from "./pages/huespedes/HuespedesList.vue";
import HuespedForm from "./pages/huespedes/HuespedForm.vue";

const routes = [
    {
        path:"/",
        component: DefaultLayout,
        children: [ // Todas las páginas en children comparten/heredan el mismo componente: DefaultLayout --> header
                    // Esto es especialmente util para que todas las paginas hereden de una que muestre 
                    // el footer, el header, etc
            // Agregamos la gestión de hoteles dentro del DefaultLayout
            { path: "/hoteles", name: "HotelList", component: HotelList},
            { path: "/hoteles/nuevo", name: "HotelForm", component: HotelForm},
            { path: "/hoteles/:id/habitaciones", name: "HotelEdit", component: HotelEdit}, // :id es un parametro dinamico que representa el id del hotel a editar
            
            { path: "/hoteles/:id/habitaciones/nueva", name: "HabitacionForm", component: HabitacionForm},
            
            { path: "/hoteles/:id/habitaciones/:habitacionId/huespedes", name: "HuespedesList", component: HuespedesList},
            { path: "/hoteles/:id/habitaciones/:habitacionId/huespedes/nuevo", name: "HuespedForm", component: HuespedForm}
        ],

        beforeEnter: async (to, from, next) => {
            try {
                const userStore = useUserStore();
                await userStore.fetchUser();
                next();
            } catch (error) {
                console.error('Failed to fetch data:', error);
                next(false); // Cancel navigation if data fetching fails
            }
        },  
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/signup',
        name: 'Signup',
        component: Signup,
    },
    // Debe estar al final de routes[], para que Vue Router primero intente 
    // encontrar una coincidencia antes de asumir que es una ruta inexistente
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;