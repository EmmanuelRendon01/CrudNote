import { get } from "./requests.js";

let signOut = null;
let signOutHandler = null;

export function init() {
    renderPage();

    signOut = document.getElementById('signOut');
    signOutHandler = (e) => {
        sessionStorage.clear();
        window.location.href = '#/';
    }


    signOut.addEventListener('click', signOutHandler);
}

export function cleanup() {

    if (signOut && signOutHandler) {
        signOut.removeEventListener('click', signOutHandler);
    }

    signOut = null;
    signOutHandler = null;
}

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

window.pageModules = window.pageModules || {};
window.pageModules['dashboard.js'] = { init, cleanup };







