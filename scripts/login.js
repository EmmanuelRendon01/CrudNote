import { loadCss } from '../utils/loadCss.js';

export function render() {

    loadCss('styles/login.css');

    return `
        <nav class="navbar navbar-expand-lg border border-color-secondary">
    <div class="container-fluid">
        <a class="navbar-brand mx-5 fw-bold fs-4" href="#">CrudNote</a>
    </div>
</nav>

<main>
    <div class="container">
        <div class="login d-flex flex-column justify-content-center align-items-center">

            <h1 class="text-center mb-4">Welcome Back</h1>

            <div class="login__form w-100">
                <form id="login__form">
                    <div class="mb-3">
                        <input type="email" class="form-control" id="email" name="email"
                            placeholder="Email or username">
                    </div>

                    <div class="mb-3">
                        <input type="password" class="form-control" id="password" placeholder="Password" name="password">
                    </div>

                    <button type="submit" class="login__btn btn btn-primary w-100 fw-bold">Sign In</button>

                </form>
            </div>

            <p class="text-secondary text-center mt-4">Don't have an account? Register</p>
        </div>
    </div>

</main>
    `
}

export function afterRender() {
  const loginForm = document.getElementById('login__form');

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
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
          sessionStorage.setItem('logged', "true");
          sessionStorage.setItem('session', JSON.stringify(emailResponse[0]));
          window.location.href = '#/dashboard';
        } else {
          alert("Correo, usuario o contraseña incorrectos");
        }
      } else {
        alert("Correo, usuario o contraseña incorrectos");
      }
    });
  }
}



