const header = document.querySelector('header');
const dropContainer = document.createElement('div');
const dropDown = document.createElement('div');

const data = [
    {id: '1', value: 'Date'},
    {id: '2', value: 'Name'},
    {id: '3', value: 'Priority'}
];

const createInputSort = () => {
    dropContainer.classList.add('drop-container');
    dropContainer.insertAdjacentHTML('afterbegin', `
        <div id="selectInput" class="btn select-input">
            <span id='inputText'>${$.selectedValue || 'Sort by'}</span>
            <i id="arrow" class="fas fa-chevron-down"></i>
        </div>
    `);
    header.append(dropContainer);
}
createInputSort();

const items = data.map(item => {
    return `
        <li id='${item.value}' onclick='onclickItems(event)' class="select-item" data-type='item' data-value='${item.value}'>${item.value}</li>
    `
});

const createSelect = () => {
    dropDown.classList.add('select-dropdown');
    dropDown.insertAdjacentHTML('afterbegin', `
        <ul class="select-list">
           ${items.join('')}
        </ul>
    `);
    dropContainer.append(dropDown);
}
createSelect();

const selectToggle = () => {
    dropDown.classList.toggle('open-select');
    const arrow = document.getElementById('arrow');
    arrow.classList.toggle('fa-chevron-up');
}

selectInput.onclick = () => selectToggle();

const onclickItems = (e) => {
    selectToggle();
    const inputText = document.getElementById('inputText');
    inputText.innerHTML = e.target.dataset.value;
    $.selectedValue = e.target.dataset.value;
    sortByName();
}

// 1 drop   date, title.name, priority
// 2 drop incrising decrising
