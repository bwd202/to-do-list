export {showDropDown}

function showDropDown(e) {

    if(e.target.classList.contains('banner')) {
        
        e.target.lastElementChild.classList.toggle('visible')

        reverseChevron()
    }
}

function reverseChevron() {

    let container = document.querySelectorAll('.chevron')

    container.innerHTML = '2b9d'
}