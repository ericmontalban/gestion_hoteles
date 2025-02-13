import axios from "axios";
import router from "./router.js"; // Importa el enrutador de Vue para redirigir a Login en caso de error 401 (sin autorización).

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, //  Usa la variable VITE_API_BASE_URL del archivo .env para definir la URL del backend (Laravel API).
    withCredentials: true, // Habilita cookies HTTP para manejar sesiones de usuario con Laravel Sanctum.
    withXSRFToken: true // Protege contra ataques CSRF, asegurando que las solicitudes sean seguras. Genera un token XSRF
});

/*
// Intercepta todas las peticiones HTTP hechas con axiosClient antes de que se envíen al 
// backend, y agrega automáticamente el token de autenticación en los headers de la solicitud.
axiosClient.interceptors.request.use(config => {
    // El token es una clave única que laravel genera cuando un usuario inicia sesión en el sistema.
    // Sirve para identificar y autenticar al usuario en cada petición sin necesidad de que vuelva 
    // a introducir sus credenciales. En cada petición, el frontend envía el token al backend en el 
    // header de la petición HTTP.

    // Busca el token guardado en el almacenamiento local del navegador.
    // Este token se obtiene tras iniciar sesión en Login.vue
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Agrega el token al header de la solicitud HTTP
    }
    return config;
})
*/

axiosClient.interceptors.response.use((response) => {
    return response;
}, error => {
    // Si hay un error 401 (Unauthorized), significa que el usuario no está autenticado o su sesión ha expirado.
    if (error.response && error.response.status === 401) {
        //  Redirige al usuario automáticamente a la página de login (/login) usando Vue Router.
        router.push({name: 'Login'});
    }
    throw error;
})

export default axiosClient;
