import { loadCss } from '../utils/loadCss.js';
import { get, remove, update } from "./requests.js";

let access = null;
let permission = null;

export function render() {
    access = JSON.parse(sessionStorage.getItem('noteAccess'));
    loadCss('styles/note.css');

    permission = access.perm;

    let html = `            <nav class="navbar navbar-expand-lg border border-color-secondary">
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
        <form id="formUpdate">
            <div class="row pt-5 mt-5">
                <div class="col-12 col-md-6 col-lg-6 d-flex flex-column">
                    <h3 class="pb-3">Meeting Notes</h3>

                    <label for="title" class="form-label"></label>
                    <input type="text" class="form-control mb-2" id="title" name="title"
                        placeholder="Note title here...">
                    <textarea class="form-control" id="noteBody" rows="8" placeholder="Note here..."
                        name="noteBody"></textarea>`;

    if (permission === 'all') {
        html = html + `
                    <div class="d-flex pt-5 gap-4">
                        <button type="submit" class="btn btn-primary fw-bold btn-lg">Edit Note</button>
                        <button type="click" class="btn btn-danger fw-bold btn-lg" id="deleteNote">Delete Note</button>
                    </div>
                </div>
                <div class="col-12 col-md-6 col-lg-6">
                    <img src="https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="notes-img" class="note__img img-fluid rounded ms-5">
                </div>

            </div>
        </form>
        <form id="shareNoteForm">
            <div class="mb-3">
                <label for="share" class="form-label">Username or Email to share note</label>
                <input type="text" class="form-control" id="share" aria-describedby="emailHelp" placeholder="Username or email here" name="email">
                <select class="form-select mt-2" aria-label="Default select example" name="permission">
                    <option selected disabled value="">Select the permission type</option>
                    <option value="read">Read</option>
                    <option value="edit">Edit</option>
                </select>
            </div>
            <button type="submit" class="btn btn-info fw-bold btn-lg">Share Note</button>
        </form>
    </div>
</main>
        
        `
    } else if (permission === 'edit') {
        html = html + `
            <div class="d-flex pt-5">
                        <button type="submit" class="btn btn-primary fw-bold btn-lg">Edit Note</button>
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
    } else if (permission === 'read') {
        html = html + `
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

    return `${html}`

}

export async function afterRender() {


    const signOut = document.getElementById('signOut');
    signOut.addEventListener('click', (e) => {
        sessionStorage.clear();
        window.location.href = '#/';
    })

    if (permission === 'read') {
        document.getElementById('title').disabled = true;
        document.getElementById('noteBody').disabled = true;
    }

    const data = await get('notes');
    const users = await get('users');

    const note = data.find(n => n.id === access.id);

    const title = document.getElementById('title');
    const noteBody = document.getElementById('noteBody');
    title.value = note.title;
    noteBody.value = note.noteBody;

    const formUpdate = document.getElementById('formUpdate');
    if (formUpdate) {
        formUpdate.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(formUpdate);

            let data = {}

            for (const [key, value] of formData.entries()) {
                data[key] = value;
            }

            if (!data.title.trim()) {
                alert('Ponle un titulo a la nota.');
                return;
            }

            update(data, 'notes', note.id);
            window.location.href = "#/dashboard";

        })

    }

    const deleteNote = document.getElementById('deleteNote');
    if (deleteNote) {
        deleteNote.addEventListener('click', (e) => {
            e.preventDefault();
            const val = confirm('¿Estas seguro de que deseas eliminar la nota?')

            if (val) {
                remove('notes', note.id);
                window.location.href = "#/dashboard";
            }

        })
    }

    const shareNoteForm = document.getElementById('shareNoteForm');
    if (shareNoteForm) {
        shareNoteForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(shareNoteForm);

            let data = {}

            for (const [key, value] of formData.entries()) {
                data[key] = value;
            }

            if (!data.email.trim()) {
                alert('Digita el correo o el usuario.');
                return;
            }

            if (!data.permission) {
                alert('Selecciona un permiso.');
                return;
            }

            const user = users.find(u => u.username === data.email || u.email === data.email);
            if (!user) {
                alert('Ese usuario no existe.');
                return;
            }

            const userString = sessionStorage.getItem('session');
            const activeUser = JSON.parse(userString);

            if (activeUser.id === user.id) {
                alert("No puedes compartirte una nota propia");
                return;
            }

            const userShared = {
                "userId": user.id,
                "permission": data.permission
            }

            const sharedValidation = note.shared.find(u => u.userId === user.id)
            if (sharedValidation) {
                alert('Ya le compartiste la nota a este usuario.');
                return;
            }

            note.shared.push(userShared);

            update(note, 'notes', note.id);
            alert(`Has compartido esta nota a ${data.email}`);
            window.location.href = "#/dashboard";
        })
    }
}