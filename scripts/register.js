import { add } from './requests.js';

let registerForm = null;
let registerHandler = null;

export function init() {
    registerForm = document.getElementById('register__form');

    if (registerForm) {
        registerHandler = async (e) => {
            e.preventDefault();

            const formData = new FormData(registerForm);

            let data = {}

            for (const [key, value] of formData.entries()) {
                data[key] = value;
            }

            data["notes"] = [];

            if (!data.email || !data.password || !data.name || !data.username) {
                alert("Hay campos vacíos");
                return;
            }
            const emailFetch = await fetch(`http://localhost:3000/users?email=${data.email}`);
            const emailResponse = await emailFetch.json();

            const usernameFetch = await fetch(`http://localhost:3000/users?username=${data.username}`);
            const usernameResponse = await usernameFetch.json();

            if (emailResponse.length > 0) {
                alert("Correo ya registrado");
                return;
            }

            if (usernameResponse.length > 0) {
                alert("Usuario ya registrado");
                return;
            }


            add(data);

            window.location.href = '#/dashboard'
            sessionStorage.setItem('logged', "true")
        };

        registerForm.addEventListener('submit', registerHandler)
    }
}

export function cleanup() {
    if (registerForm && registerHandler) {
        registerForm.removeEventListener('submit', registerHandler)
    }

    registerForm = null;
    registerHandler = null;

}

window.pageModules = window.pageModules || {};
window.pageModules['register.js'] = { init, cleanup };
