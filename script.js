
const $ = {};
//const container = document.createElement('div');
let priority = 'green';
let timeNow;
function time() {
    timeNow = new Date().toString().slice(0, 21)
};

let notes = JSON.parse(localStorage.getItem('notes')) || [];

const renderNotes = (container, title, content, priority, timeNow, index) => {
    container.classList.add('container');
    container.insertAdjacentHTML('beforeend', `
        <div class="my-notes priority-${priority} wrapper-${index}">
            <button onclick='deleteNote(${index})' class='note-close'>x</button>
            <p class="note-title">${title}</p>
            <div class="note-content">${content}</div>
            <div class="note-time"><span>${timeNow}</span></div>
        </div>
        `)
    document.body.append(container);
}

const notesMap = () => {
    const container = document.createElement('div');
    notes.map((note, index) => {
        renderNotes(container, note.title, note.content, note.priority, note.time, index)
    });
}
notesMap();

function createModal() {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    modal.insertAdjacentHTML('afterbegin', `
        <div class="modal-overlay">
            <div class="modal-window">
                <div class="modal-header">
                    <span class="modal-title">New Note</span>
                    <span id='modalClose' class="modal-close">X</span>
                </div>
                <div class="modal-body">
                    <input id='inputTitle' class='input-title' placeholder='Title'/>
                    <textarea id='inputContent' class='input-content' placeholder='note...'></textarea>
                    <div class="form">
                        <div class="form-radio-btn">
                            <input id="radio-1" type="radio" name="radio" value="red">
                            <label for="radio-1">High priority</label>
                        </div>
                        <div class="form-radio-btn">
                            <input id="radio-2" type="radio" name="radio" value="yellow">
                            <label for="radio-2">Middle priority</label>
                        </div>
                        <div class="form-radio-btn">
                            <input id="radio-3" type="radio" name="radio" value="green">
                            <label for="radio-3">Low priority</label>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id='saveBtn'>Save Note</button>
                    <button id='closeBtn'>Close</button>
                </div>
            </div>
        </div>
    `)
    document.body.append(modal);
    return modal;
}


$.modal = function(options) {
    const $modal = createModal(options);
    const animSpeed = 500;
    
    return {
        open() {
            $modal.classList.add('open')
        },
        close() {
            $modal.classList.remove('open');
            $modal.classList.add('hide')
            setTimeout(() => {
                $modal.classList.remove('hide')
            }, animSpeed)
        }
    }
}

const newModal = $.modal();

const saveNote = () => {
    time();
    if(inputTitle.value && inputContent.value) {
        notes.push({
            title: inputTitle.value,
            content: inputContent.value,
            priority,
            time: timeNow,
        })
        localStorage.setItem('notes', JSON.stringify(notes));

        let note = notes[notes.length-1];
        let container = document.querySelector('.container') || document.createElement('div');
        renderNotes(container, note.title, note.content, note.priority, timeNow, notes.length - 1);
    }
}

function deleteNote(index) {
    let el = document.querySelector(`.wrapper-${index}`);
    el.parentElement.remove();
    notes.splice(index, 1);
    notesMap();
    localStorage.setItem('notes', JSON.stringify(notes));
}


addBtn.onclick = () => newModal.open();

closeBtn.onclick = () => newModal.close();

modalClose.onclick = () => newModal.close();

saveBtn.onclick = () => {
    radioCheck();
    saveNote();
    newModal.close();
    clearInput();
};


function radioCheck() {
    const rad = document.getElementsByName('radio');
    for(el of rad) {
        if(el.checked) {
            priority = el.value;
        }
    }
}

const clearInput = () => {
    inputTitle.value = '';
    inputContent.value = '';
}
