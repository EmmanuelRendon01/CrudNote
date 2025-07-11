let createNoteForm = null;
let createNoteHandler = null;

import { add } from "./requests.js";

export function init() {
    createNoteForm = document.getElementById('createNoteForm');

    createNoteHandler = async (e) => {

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

        console.log(data);


        createNoteForm.reset();

        add(data, 'notes')
        window.location.href = '#/dashboard';
    }

    createNoteForm.addEventListener('submit', createNoteHandler);
}


export function cleanup() {
    if (createNoteForm && createNoteHandler) {
        createNoteForm.removeEventListener('submit', createNoteHandler);
    }

    createNoteForm = null;
    createNoteHandler = null;
}



window.pageModules = window.pageModules || {};
window.pageModules['note.js'] = { init, cleanup };