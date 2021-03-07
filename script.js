
const $ = {};
const container = document.createElement('div');

let notes = JSON.parse(localStorage.getItem('notes')) || [];

const renderNotes = (htmlElement, title, content, index) => {
    htmlElement.classList.add('container');
    htmlElement.insertAdjacentHTML('beforeend', `
        <div class="my-notes wrapper-${index}">
                <button onclick='deleteNote(${index})' class='note-close'>x</button>
                <p class="note-title">${title}</p>
                <p class="note-content">${content}</p>
        </div>
        `)
    document.body.append(htmlElement);
}

notes.map((note, index) => renderNotes(container, note.Title, note.Content, index));


function createModal(options) {
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
                            <input id="radio-1" type="radio" name="radio" value="1">
                            <label for="radio-1">High priority</label>
                        </div>
                        <div class="form-radio-btn">
                            <input id="radio-2" type="radio" name="radio" value="2">
                            <label for="radio-2">Middle priority</label>
                        </div>
                        <div class="form-radio-btn">
                            <input id="radio-3" type="radio" name="radio" value="3">
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
        },
        
      
    }
}

const newModal = $.modal();

const saveNote = () => {
    if(inputTitle.value && inputContent.value) {
        notes.push({
            Title: inputTitle.value,
            Content: inputContent.value
        })
        localStorage.setItem('notes', JSON.stringify(notes));

        let note = notes[notes.length-1];
        renderNotes(container, note.Title, note.Content);
    }
    inputTitle.value = '';
    inputContent.value = '';
}

const deleteNote = (index) => {
    let el = document.querySelectorAll(`.wrapper-${index}`)
    el[0].remove();
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
}

addBtn.onclick = () => newModal.open();

closeBtn.onclick = () => newModal.close();

modalClose.onclick = () => newModal.close();

saveBtn.onclick = () => {
    saveNote();
    newModal.close();
};
