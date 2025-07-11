import { get } from "./requests.js";
import { loadCss } from '../utils/loadCss.js';

export function render() {

    loadCss('styles/dashboard.css');

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
                    <button type="button" class="btn btn-light fw-bold text-black" id="signOut">Sign Out</button>
                </div>
            </div>
        </div>

    </div>
</nav>

<main>
    <div class="container">
        <div class="row pt-5">
            <div class="col-12">
                <h1 id="greetings"></h1>
            </div>
        </div>

        <div class="row pt-5">
            <div class="d-flex gap-5 pb-3">
                <button type="button" class="btn btn-light fw-bold text-black">All</button>
                <button type="button" class="btn btn-light fw-bold text-black">Personal</button>
                <button type="button" class="btn btn-light fw-bold text-black">Shared</button>
            </div>
            <hr>
        </div>

        <div class="row pt-4" id="myNotes">
            <div class="col-12  pb-2">
                <h3>My Notes</h3>
            </div>

            
        </div>

        <div class="row pt-3" id="sharedNotes">

            <div class="col-12 pb-3">
                <h3>Notes Shared With Me</h3>
            </div>

            
        </div>

        <div class="row pt-5">
            <div class="col-12 text-end mb-3">
                <a class="btn btn-primary rounded fw-bold btn-l" href="#/note" role="button">+ New Note</a>
            </div>
        </div>

    </div>
</main>
        
        `
}



export function afterRender() {

    const signOut = document.getElementById('signOut');
    signOut.addEventListener('click', (e) => {
        sessionStorage.clear();
        window.location.href = '#/';
    })

    async function renderPage() {

        const myNotes = document.getElementById('myNotes');
        const sharedNotes = document.getElementById('sharedNotes');
        const greetings = document.getElementById('greetings');

        const data = await get('notes');
        const userString = sessionStorage.getItem('session');
        const user = JSON.parse(userString);

        greetings.innerHTML = `Hello, ${user.name}`;

        renderMyNotes(data, user, myNotes);
        renderSharedNotes(data, user, sharedNotes);
    }

    function renderMyNotes(data, user, myNotes) {

        data.forEach(note => {
            if (user.id === note.authorId) {
                const cardNote = document.createElement("div");
                cardNote.className = "col-12 col-md-3 col-lg-3 mb-3";

                cardNote.innerHTML = `
                <div class="card h-100">
                    <i class="bi bi-person-add fs-4 mx-3 pt-3"></i>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title fw-bold text-black">${note.title}</h5>
                        <p class="card-text text-secondary mt-auto">${note.noteBody.slice(0, 60)}...</p>
                    </div>
                </div>
                `;
                myNotes.appendChild(cardNote)
            }
        });
    }

    function renderSharedNotes(data, user, sharedNotes) {
        data.forEach(note => {
            let sharedNote = note.shared;

            for (const objectNote of sharedNote) {
                if (objectNote.userId === user.id) {
                    const sharedCardNote = document.createElement("div");
                    sharedCardNote.className = "col-12 col-md-4 col-lg-4 mb-3";

                    sharedCardNote.innerHTML = `
                 <div class="card">
                    <i class="bi bi-person-add fs-4 mx-3 pt-3"></i>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title fw-bold text-black">${note.title}</h5>
                        <p class="card-text text-secondary mt-auto">${note.noteBody.slice(0, 100)}...</p>
                    </div>
                </div>
            `
                    sharedNotes.appendChild(sharedCardNote)
                }
            }
        });
    }

    renderPage();
}