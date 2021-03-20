const container = document.querySelector('.container') || document.createElement('div');

const createNote = (container, index, {title, content, priority, time}) => {
    container.classList.add('container');
    container.insertAdjacentHTML('beforeend', `
        <div class="my-notes priority-${priority} wrapper-${index}">
            <button onclick='deleteNote(${index})' class='note-close'>x</button>
            <p class="note-title">${title}</p>
            <div class="note-content">${content}</div>
            <div class="note-time"><span>${time}</span></div>
        </div>
        `)
    document.body.append(container);
}

const renderNotes = () => {
    notes.map((note, index) => {
        createNote(container, index, note);
    });
}

const saveNote = () => {
    let timeNow = time();
    let priority = $.priority || 'c-green';
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

const deleteNote = index => {
    let el = document.querySelector(`.wrapper-${index}`);
    el.parentElement.innerHTML = '';
    notes.splice(index, 1);
    renderNotes();
    localStorage.setItem('notes', JSON.stringify(notes));
}