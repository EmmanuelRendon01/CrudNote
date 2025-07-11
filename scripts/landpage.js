export function render() {
    return `
<nav class="navbar navbar-expand-lg border border-color-secondary">
  <div class="container-fluid">
    <a class="navbar-brand mx-5 fw-bold fs-4" href="#">CrudNote</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
      aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end mx-5" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <a class="nav-link fw-bold text-black" href="#">Home</a>
        <a class="nav-link fw-bold text-black" href="#">Contact</a>
        <a class="nav-link fw-bold text-black" href="#">Terms</a>
        <div class="d-flex gap-2 ms-3">
          <a class="btn btn-primary fw-bold" href="#/login" role="button">Sign In</a>
          <a class="btn btn-light fw-bold text-black" href="#/register" role="button">Register</a>
        </div>
      </div>
    </div>
  </div>
</nav>

<main>
  <div class="container d-flex flex-column">
    <section class="d-flex flex-column py-5">
      <div class="row">
        <div class="col-12 col-md-6 col-lg-5">
          <img src="https://images.unsplash.com/photo-1729508419473-b2d296bffbb2?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHx8"
            alt="" class="landpage__img rounded float-left img-fluid">
        </div>
        <div class="col-12 col-md-6 col-lg-6 mt-4 mt-md-0 d-flex flex-column offset-lg-1">
          <h1 class="fw-bold display-3">Collaborate on notes with your team</h1>
          <p class="fs-5">CrudNote is collaborative note-taking application that allows you to create,
            edit, and share
            notes with your team. Sign up today to get started</p>
          <div class="d-flex gap-3 mt-4">
            <a class="btn btn-primary fw-bold" href="#/login" role="button">Sign In</a>
            <a class="btn btn-light fw-bold text-black" href="#/register" role="button">Register</a>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="row py-5">
        <div class="col-12 col-md-10 col-lg-7">
          <h1 class="fw-bold display-6">What is CrudNote?</h1>
          <p class="fs-5">CrudNote is collaborative note-taking application that allows you to create,
            edit, and share
            notes with your team. Sign up today to get started</p>
        </div>
      </div>
    </section>

    <section class="row">
      <div class="col-12 col-md-4 col-lg-4 mb-4">
        <div class="card">
          <i class="bi bi-journal-text fs-4 mx-3 pt-3"></i>
          <div class="card-body">
            <h5 class="card-title fw-bold text-black">Create</h5>
            <p class="card-text text-secondary fs-6">Create notes with rich text editing, images, and
              more</p>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-4 col-lg-4 mb-4">
        <div class="card">
          <i class="bi bi-person-add fs-4 mx-3 pt-3"></i>
          <div class="card-body">
            <h5 class="card-title fw-bold text-black">Collaborate</h5>
            <p class="card-text text-secondary">Collaborate with your team in real-time</p>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-4 col-lg-4 mb-4">
        <div class="card">
          <i class="bi bi-share fs-4 mx-3 pt-3"></i>
          <div class="card-body">
            <h5 class="card-title fw-bold text-black">Share</h5>
            <p class="card-text text-secondary">Share your notes with your team or the world.</p>
          </div>
        </div>
      </div>
    </section>

    <footer class="py-4">
      <div class="row justify-content-center text-center">
        <div class="col-12 col-md-4 col-lg-4">
          <p class="text-secondary">Home</p>
        </div>
        <div class="col-12 col-md-4 col-lg-4">
          <p class="text-secondary">Contact</p>
        </div>
        <div class="col-12 col-md-4 col-lg-4">
          <p class="text-secondary">Terms</p>
        </div>
      </div>
      <div class="row justify-content-center text-center pt-4">
        <p class="text-secondary">2024 CrudNote. All rights reserved.</p>
      </div>
    </footer>
  </div>
</main>
  `;
}
