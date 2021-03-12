const container = document.querySelector('.container') || document.createElement('div');

const createNote = (container, index, {title, content, priority, time}) => {
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