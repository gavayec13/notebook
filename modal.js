const $ = {};

window.$ = $;

const createModal = () => {
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
                            <input id="radio-1" type="radio" name="radio" value="a-red" onclick='changePriority(event)'>
                            <label for="radio-1">High priority<i class="fas fa-check"></i></label>
                        </div>
                        <div class="form-radio-btn">
                            <input id="radio-2" type="radio" name="radio" value="b-yellow" onclick='changePriority(event)'>
                            <label for="radio-2">Middle priority</label>
                        </div>
                        <div class="form-radio-btn">
                            <input id="radio-3" type="radio" name="radio" value="c-green" onclick='changePriority(event)'>
                            <label for="radio-3">Low priority</label>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id='saveBtn' class='btn'>Save Note</button>
                    <button id='closeBtn' class='btn'>Close</button>
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
            clearPriority();
            $modal.classList.remove('open');
            $modal.classList.add('hide')
            setTimeout(() => {
                $modal.classList.remove('hide')
            }, animSpeed)
        }
    }
}

const changePriority = e => {
    $.priority = e.target.value;
    
    console.log(e.target);
}
//<i class="fas fa-check"></i>
const clearPriority = () => {
    $.priority = '';
    let radio = document.getElementsByName('radio');
    for(el of radio) {
        el.checked = false;
    }
}