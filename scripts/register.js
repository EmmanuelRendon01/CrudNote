import { add } from './requests.js';
const registerForm = document.getElementById('register__form');

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(registerForm);

    let data = {}

    for (const [key, value] of formData.entries()) {
        data[key] = value;
    }

    data["notes"] = [];

    add(data);

    window.location.href = '#/dashboard'
    
})