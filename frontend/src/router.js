import { createWebHistory, createRouter } from "vue-router";
import DefaultLayout from "./components/DefaultLayout.vue"; // Asegurar que este archivo existe
import Home from "./pages/Home.vue";
import MyImages from "./pages/MyImages.vue";
import Login from "./pages/Login.vue"; 
import Signup from "./pages/Signup.vue"; 
import NotFound from "./pages/NotFound.vue";
import useUserStore from "./store/user";

const routes = [
    {
        path:"/",
        component: DefaultLayout,
        children: [ // la pagina home "/"" y "/images" comparten el mismo componente: DefaultLayout
                    // Esto es especialmente util para que todas las paginas hereden de una que muestre 
                    // el footer, el header, etc
            {path: '/', name: 'Home', component: Home},
            //{path: '/images', name: 'MyImages', component: MyImages}, 
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
        /*
        // Guardia de navegación: se ejecuta antes de entrar a esta ruta
        beforeEnter: (to, from, next) => {
        const userStore = useUserStore();  // Obtiene el store de usuario desde Pinia

        if (userStore.user) { // Si el usuario está autenticado...
            return next({ name: "Home" }); // Redirigirlo a la página principal
        }

        next(); // Si no está autenticado, permitirle ver el login
        }
        */
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