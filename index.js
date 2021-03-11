const newModal = $.modal();

const addBtn = document.getElementById('addBtn');
const container = document.querySelector('.container') || document.createElement('div');
const modalClose = document.getElementById('modalClose');
const inputTitle = document.getElementById('inputTitle');
const inputContent = document.getElementById('inputContent');
const saveBtn = document.getElementById('saveBtn');
const closeBtn = document.getElementById('closeBtn');

let notes = JSON.parse(localStorage.getItem('notes')) || [];

const time = () => {
    return new Date().toString().slice(0, 21);
};

const renderNotes = (container, index, {title, content, priority, time}) => {
    container.classList.add('container');
    container.insertAdjacentHTML('beforeend', `
        <div class="my-notes priority-${priority || 'green'} wrapper-${index}">
            <button onclick='deleteNote(${index})' class='note-close'>x</button>
            <p class="note-title">${title}</p>
            <div class="note-content">${content}</div>
            <div class="note-time"><span>${time}</span></div>
        </div>
        `)
    document.body.append(container);
}

const notesMap = () => {
    notes.map((note, index) => {
        renderNotes(container, index, note)
    });
}
notesMap();

const saveNote = () => {
    let timeNow = time();
    let priority = $.priority;
    if(inputTitle.value && inputContent.value) {
        notes.push({
            title: inputTitle.value,
            content: inputContent.value,
            priority,
            time: timeNow,
        });
        localStorage.setItem('notes', JSON.stringify(notes));

        let note = notes[notes.length-1];
        renderNotes(container, notes.length - 1, note);
    }
}

const deleteNote = index => {
    let el = document.querySelector(`.wrapper-${index}`);
    el.parentElement.innerHTML = '';
    notes.splice(index, 1);
    notesMap();
    localStorage.setItem('notes', JSON.stringify(notes));
}

addBtn.onclick = () => newModal.open();

closeBtn.onclick = () => newModal.close();

modalClose.onclick = () => newModal.close();

saveBtn.onclick = () => {
    saveNote();
    newModal.close();
    clearInput();
};

const clearInput = () => {
    inputTitle.value = '';
    inputContent.value = '';
}
