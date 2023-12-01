import chevronUp from './icons/chevron-up-solid.svg'
import chevronDown from './icons/chevron-down-solid.svg'
export {showDropDown}

// icons
let chevronDown1 = new Image(15,15)
chevronDown1.src = chevronDown
chevronDown1.classList.add('button')

document.querySelector('.chevron').append(chevronDown1)

let chevronUp1 = new Image(15,15)
chevronUp1.src = chevronUp

// fns
function showDropDown(e) {

    if(e.target.classList.contains('banner')) {
        
        e.target.lastElementChild.classList.toggle('visible')

        reverseChevron()
    }
}

function reverseChevron() {

    let container = document.querySelector('.chevron')

    container.firstElementChild.remove()

    container.append(chevronUp1)
}