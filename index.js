let notes = JSON.parse(localStorage.getItem('notes')) || [];
const addNote = document.getElementById('addNote');
// const modalClose = document.getElementById('modalClose');
// const inputTitle = document.getElementById('inputTitle');
// const inputContent = document.getElementById('inputContent');
// const saveBtn = document.getElementById('saveBtn');
// const closeBtn = document.getElementById('closeBtn');

const time = () => {
    return new Date().toString().slice(0, 21);
};

renderNotes();

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

const sortBy = (value) => {
    document.querySelector('.container').innerHTML = '';
    if(value === 'Name') {
        notes.sort((a, b) => a.title.localeCompare(b.title));
    } else if(value === 'Date') {
        notes.sort(function(a,b){
            let c = new Date(a.time);
            let d = new Date(b.time);
            return c-d;
        });
    }
    renderNotes();
    localStorage.setItem('notes', JSON.stringify(notes));
}
