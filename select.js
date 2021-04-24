const selectInputBtn = document.getElementById('selectInputBtn');
const dropDown = document.getElementById('dropDown');
const selectList = document.getElementById('selectList');
const inputText = document.getElementById('inputText');
inputText.innerHTML = $.selectedValue || 'Sort by';

const data = [
    {id: '1', value: 'Date'},
    {id: '2', value: 'Name'},
    {id: '3', value: 'Priority'}
];

const items = data.map(item => {
    return `
        <li id='${item.value}' onclick='showSelectedItemInSorting(event)' class='select-item' data-value='${item.value}'>${item.value}</li>
    `
});
selectList.innerHTML = items.join('');

const openCloseSorting = () => {
    dropDown.classList.toggle('open-select');
    const arrow = document.getElementById('arrow');
    arrow.classList.toggle('fa-chevron-up');
}

selectInputBtn.onclick = () => openCloseSorting();

const showSelectedItemInSorting = event => {
    openCloseSorting();
    let newValue = event.target.dataset.value;
    inputText.innerHTML = newValue;
    sortBy(newValue);
}