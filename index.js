let notes = JSON.parse(localStorage.getItem('notes')) || [];

const time = () => {
    return new Date().toString().slice(0, 21);
};

const renderNotes = () => {
    notes.map((note, index) => {
        createNote(container, index, note);
    });
}
renderNotes();

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
        createNote(container, notes.length - 1, note);
    }
}

const deleteNote = index => {
    let el = document.querySelector(`.wrapper-${index}`);
    el.parentElement.innerHTML = '';
    notes.splice(index, 1);
    renderNotes();
    localStorage.setItem('notes', JSON.stringify(notes));
}

const newModal = $.modal();

addNote.onclick = () => newModal.open();

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