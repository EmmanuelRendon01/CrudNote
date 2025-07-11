import { loadCss } from '../utils/loadCss.js';
import { add } from './requests.js';

export function render() {

    loadCss('styles/register.css');

    return `
        <nav class="navbar navbar-expand-lg border border-color-secondary">
    <div class="container-fluid">
        <a class="navbar-brand mx-5 fw-bold fs-4" href="#">CrudNote</a>
    </div>
</nav>

<main>
    <div class="container">
        <div class="form row">
            <div class="col-12 col-md-4 col-lg-4">
                <h1 class="text-black fw-bold pb-5">Create your account</h1>
                <form id="register__form">
                    <div class="mb-3">
                        <label for="name" class="form-label fw-bold">Full name</label>
                        <input type="text" class="form-control" id="name" name="name"
                            placeholder="Enter your full name">
                    </div>

                    <div class="mb-3">
                        <label for="email" class="form-label fw-bold">Email</label>
                        <input type="email" class="form-control" id="email" placeholder="Enter your email" name="email">
                    </div>

                    <div class="mb-3">
                        <label for="username" class="form-label fw-bold">Username</label>
                        <input type="text" class="form-control" id="username" name="username"
                            placeholder="Enter new your username">
                    </div>

                    <div class="mb-3">
                        <label for="password" class="form-label fw-bold">Password</label>
                        <input type="password" class="form-control" id="password" name="password"
                            placeholder="Create a password">
                    </div>

                    <button type="submit" class="register__btn btn btn-primary">Register</button>
                </form>
            </div>

            <div class="col-12 col-md-8 col-lg-8">
                <img src="https://images.unsplash.com/photo-1729508419473-b2d296bffbb2?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHx8"
                    alt="" class="register__img rounded float-left img-fluid">
            </div>


        </div>
    </div>

</main>
    `

}

export function afterRender() {

    const registerForm = document.getElementById('register__form');

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(registerForm);

            let data = {}

            for (const [key, value] of formData.entries()) {
                data[key] = value;
            }

            if (!data.email.trim() || !data.password.trim() || !data.name.trim() || !data.username.trim()) {
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

            await add(data, 'users');

            window.location.href = '#/dashboard'
            sessionStorage.setItem('logged', "true");
            sessionStorage.setItem('session', JSON.stringify(data));
        })
    };
}

