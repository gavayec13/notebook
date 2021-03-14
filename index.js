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

const selectToggle = () => {
    const dropDown = document.querySelector('.select-dropdown');
    dropDown.classList.contains('open-select') ? dropDown.classList.remove('open-select') : dropDown.classList.add('open-select');
}

selectInput.onclick = () => selectToggle();

// 1 drop   date, title.name, priority
// 2 drop incrising decrising
