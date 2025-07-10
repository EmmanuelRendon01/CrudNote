import { get } from "./requests.js";

const loginForm = document.getElementById('login__form');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(loginForm);

    let data = {}

    for (const [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    const emailFetch = await fetch(`http://localhost:3000/users?email=${data.email}`);
    const emailResponse = await emailFetch.json();
    
    if (emailResponse[0]) {
        if (emailResponse[0].password == data.password) {
            alert("Inicio de sesión exitoso.");
        }
        else{
            alert("Correo, usuario o contraseña incorrectos")
        }
        
    }else{
        alert("Correo, usuario o contraseña incorrectos")
    }









})

