// scripts/login.js

// Variables para guardar el formulario de login y el evento que se va a ejecutar cuando se envíe
let loginForm = null;
let loginHandler = null;

// Esta función se ejecuta cuando entramos a la página de login
export function init() {
    console.log('Inicializando login'); // Para ver en la consola que se está cargando esta parte

    // Buscamos el formulario de login en el HTML
    loginForm = document.getElementById('login__form');
    
    // Si encontramos el formulario...
    if (loginForm) {
        // Creamos la función que se ejecutará cuando se envíe el formulario
        loginHandler = async (e) => {
            e.preventDefault(); // Evitamos que la página se recargue al enviar el formulario

            // Obtenemos todos los datos del formulario y los pasamos a un objeto
            const formData = new FormData(loginForm);
            let data = {};
            for (const [key, value] of formData.entries()) {
                data[key] = value;
            }

            // Si el campo de correo o contraseña está vacío, mostramos un mensaje y detenemos el proceso
            if (!data.email || !data.password) {
                alert("Hay campos vacíos");
                return;
            }
            
            // Buscamos en la base de datos (JSON Server) un usuario con ese correo
            const emailFetch = await fetch(`http://localhost:3000/users?email=${data.email}`);
            const emailResponse = await emailFetch.json();
            
            // Si encontramos un usuario con ese correo...
            if (emailResponse[0]) {
                // Verificamos si la contraseña también coincide
                if (emailResponse[0].password === data.password) {
                    alert("Inicio de sesión exitoso.");
                    window.location.href = '#/dashboard'; // Redirigimos al panel del usuario
                } else {
                    alert("Correo, usuario o contraseña incorrectos");
                }
            } else {
                alert("Correo, usuario o contraseña incorrectos");
            }
        };

        // Asociamos la función al formulario, para que se ejecute cuando se envíe
        loginForm.addEventListener('submit', loginHandler);
    }
}

// Esta función se llama cuando salimos de la página de login
export function cleanup() {
    // Si el formulario y la función de envío existen, quitamos el evento para evitar duplicaciones
    if (loginForm && loginHandler) {
        loginForm.removeEventListener('submit', loginHandler);
    }

    // Limpiamos las variables para que no ocupen memoria
    loginForm = null;
    loginHandler = null;
}

// Registramos este módulo (login.js) en una lista global, para que pueda ser gestionado desde el router
window.pageModules = window.pageModules || {};
window.pageModules['login.js'] = { init, cleanup };
