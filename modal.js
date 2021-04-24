const $ = {};

window.$ = $;

$.modal = function(options) {
    const modal = document.getElementById('modal');
    const animSpeed = 500;
    return {
        open() {
            modal.classList.add('open');
        },
        close() {
            clearPriority();
            modal.classList.remove('open');
            modal.classList.add('hide');
            setTimeout(() => {
                modal.classList.remove('hide');
            }, animSpeed)
        }
    }
}

const changePriority = e => {
    $.priority = e.target.value;
}

const clearPriority = () => {
    $.priority = '';
    let radio = document.getElementsByName('radio');
    for(el of radio) {
        el.checked = false;
    }
}