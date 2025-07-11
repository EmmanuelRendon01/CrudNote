let loginForm = null;
let loginHandler = null;

export function init() {

    loginForm = document.getElementById('login__form');
    
    if (loginForm) {
        loginHandler = async (e) => {
            e.preventDefault();

            const formData = new FormData(loginForm);
            let data = {};

            for (const [key, value] of formData.entries()) {
                data[key] = value;
            }

            if (!data.email || !data.password) {
                alert("Hay campos vacíos");
                return;
            }
            
            const emailFetch = await fetch(`http://localhost:3000/users?email=${data.email}`);
            const emailResponse = await emailFetch.json();
            
            if (emailResponse[0]) {
                if (emailResponse[0].password === data.password) {
                    alert("Inicio de sesión exitoso.");
                    sessionStorage.setItem('logged', "true")
                    sessionStorage.setItem('session', JSON.stringify(emailResponse[0]))
                    window.location.href = '#/dashboard'
                }
                else{
                    alert("Correo, usuario o contraseña incorrectos")
                }
                
            }else{
                alert("Correo, usuario o contraseña incorrectos")
            }
        };
        
        loginForm.addEventListener('submit', loginHandler);
    }
}

export function cleanup() {

    if (loginForm && loginHandler) {
        loginForm.removeEventListener('submit', loginHandler);
    }
    
    loginForm = null;
    loginHandler = null;
}


window.pageModules = window.pageModules || {};
window.pageModules['login.js'] = { init, cleanup };