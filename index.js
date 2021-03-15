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
//////////////////////////////////////////////////////////////////
const data = [
    {id: 1, value: 'date'},
    {id: 2, value: 'name'},
    {id: 3, value: 'priority'}
];

const items = data.map(item => {
    return `
        <li class="select-item" data-type='item' data-value='${item.id}'>${item.value}</li>
    `
})

const createInputSort = () => {
    const dropContainer = document.createElement('div');
    const header = document.querySelector('header')
    dropContainer.classList.add('drop-container');
    dropContainer.insertAdjacentHTML('afterbegin', `
        <div id="selectInput" class="select-input">
            <span>Sort by</span>
            <i id="arrow" class="fas fa-chevron-down"></i>
        </div>
    `)
    header.append(dropContainer);
}
createInputSort();

const createSelect = () => {
    const selectDrop = document.createElement('div');
    selectDrop.classList.add('select-dropdown');
    const dropContainer = document.querySelector('.drop-container');
    selectDrop.insertAdjacentHTML('afterbegin', `
        <ul class="select-list">
           ${items.join('')}
        </ul>
    `)
    dropContainer.append(selectDrop);
}

const selectToggle = () => {
    const dropDown = document.querySelector('.select-dropdown');
    dropDown.classList.contains('open-select') ? dropDown.classList.remove('open-select') : dropDown.classList.add('open-select');
}

const arrowToggle = () => {
    const arrow = document.getElementById('arrow');
    if( arrow.classList.contains('fa-chevron-down')) {
        arrow.classList.remove('fa-chevron-down');
        arrow.classList.add('fa-chevron-up');
    } else {
        arrow.classList.remove('fa-chevron-up');
        arrow.classList.add('fa-chevron-down');
    }
}

selectInput.onclick = (event) => {
    const {type} = event.target.dataset.value;
    console.log(type);
    createSelect();
    selectToggle();
    arrowToggle();
}


// 1 drop   date, title.name, priority
// 2 drop incrising decrising
