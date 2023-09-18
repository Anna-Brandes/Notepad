let title = ['test'];
let note = ['note'];
let trashTitle = ['trash'];
let trashNote = ['trash'];
load();
loadTrash();


function render() {
    let content = document.getElementById('content');
    content.innerHTML = '';
    content.innerHTML += /*html*/ `
        <a href="trash.html"> <img src="trash-can-solid.svg" class="trash" ></a>
        <h1>Notepad</h1>
        `;
    content.innerHTML += /*html*/ `
      <div class="note">
         <input placeholder="Title" id="title" class="title">
         <textarea placeholder = "Note" id="note" class="notiz"></textarea>
         <button onclick="saveNote()">Save</button>
      </div>`;

    for (let i = 0; i < title.length; i++) {
        const titles = title[i];
        const notes = note[i];

        content.innerHTML += /*html*/ `
              <div class = "card">
              <b> ${titles} </b>
              <br> ${notes}
              <button class="delete" onclick="shiftNote(${i})">Archiv</button>
              </div>`;
    }

}

function save() {

    let titleAsText = JSON.stringify(title);
    localStorage.setItem('title', titleAsText);
    let noteAsText = JSON.stringify(note);
    localStorage.setItem('note', noteAsText);
    render();
}

function saveNote() {
    let titles = document.getElementById('title');
    let notes = document.getElementById('note');

    title.push(titles.value);
    note.push(notes.value);
    render();
    save();
}

function load() {
    let titleAsText = localStorage.getItem('title');
    let noteAsText = localStorage.getItem('note');

    if (titleAsText && noteAsText) {
        title = JSON.parse(titleAsText)
        note = JSON.parse(noteAsText);

    }
}

function renderTrash() {
    let content = document.getElementById('trashContent');
    content.innerHTML = '';
    content.innerHTML += /*html*/ `
    <a href = "index.html"><img src="clipboard-regular.svg" class = "start"></a>
        <h1>Trash</h1>`;

    for (let i = 0; i < trashTitle.length; i++) {
        const tt = trashTitle[i];
        const tn = trashNote[i];

        content.innerHTML += /*html*/ `
        <div class = "card"> 
            <b> ${tt} </b>
            <br> ${tn}
            <button class="delete" onclick="deleteNote(${i})">Löschen</button>
        </div>`
    }
}

function loadTrash() {
    let titleAsText = localStorage.getItem('trashTitle');
    let noteAsText = localStorage.getItem('trashNote');

    if (titleAsText && noteAsText) {
        trashTitle = JSON.parse(titleAsText);
        trashNote = JSON.parse(noteAsText);

    }
}

function deleteNote(i) {

    trashTitle.splice(i, 1);
    trashNote.splice(i, 1);
    renderTrash();
}

function saveTrash() {

    let trashAsText = JSON.stringify(trashTitle);
    localStorage.setItem('trashTitle', trashAsText);
    let trashNoteAsText = JSON.stringify(trashNote);
    localStorage.setItem('trashNote', trashNoteAsText);
    renderTrash();
}

function shiftNote(i) {
    const titleToDelete = title[i];
    const noteToDelete = note[i];
    title.splice(i, 1);
    note.splice(i, 1);
    loadTrash();
    trashTitle.push(titleToDelete);
    trashNote.push(noteToDelete);
    save();
    saveTrash();
    render();
    renderTrash();
}