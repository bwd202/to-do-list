export {updateCounter, updateModalCounter}

function updateCounter(banner) {

    let dropDown = banner.lastElementChild
   
    banner.querySelector('.counter').innerHTML = dropDown.children.length
    
}

function updateModalCounter(modal) {

    let counter = modal.previousElementSibling.querySelector('.counter')

    counter.innerHTML = modal.children.length
}