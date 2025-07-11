import { loadCss } from '../utils/loadCss.js';
import { add } from "./requests.js";

export function render() {

    loadCss('styles/note.css');
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
                <a class="nav-link fw-bold text-black" href="#/dashboard">My Notes</a>
                <a class="nav-link fw-bold text-black" href="#/dashboard">Shared Notes</a>
                <div class="d-flex gap-2 ms-3">
                    <button type="button" class="btn btn-light fw-bold text-black">Sign Out</button>
                </div>
            </div>
        </div>

    </div>
</nav>

<main>
    <div class="container">
        <form id="createNoteForm">
            <div class="row pt-5 mt-5">
                <div class="col-12 col-md-6 col-lg-6 d-flex flex-column">
                    <h3 class="pb-3">Meeting Notes</h3>

                    <label for="title" class="form-label">Note Title</label>
                    <input type="text" class="form-control mb-2" id="title" name="title"
                        placeholder="Note title here...">
                    <textarea class="form-control" id="noteBody" rows="8" placeholder="Note here..."
                        name="noteBody"></textarea>
                    <div class="d-flex pt-5">
                        <button type="submit" class="btn btn-primary fw-bold btn-lg">Create Note</button>
                    </div>
                </div>
                <div class="col-12 col-md-6 col-lg-6">
                    <img src="https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="notes-img" class="note__img img-fluid rounded ms-5">
                </div>

            </div>
        </form>
    </div>
</main>
            
            `


}

export function afterRender() {

    const createNoteForm = document.getElementById('createNoteForm');

    createNoteForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const userString = sessionStorage.getItem('session');
        const user = JSON.parse(userString);

        const formData = new FormData(createNoteForm);
        let data = {};

        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }

        if (!data.title.trim()) {
            alert("Hay campos vacíos.")
        }

        data['authorId'] = user.id;
        data['shared'] = [];

        createNoteForm.reset();

        add(data, 'notes')
        window.location.href = '#/dashboard';
    });


}



