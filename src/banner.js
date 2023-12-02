import chevronUp from './icons/chevron-up-solid.svg'
import chevronDown from './icons/chevron-down-solid.svg'
export {expandCollapseBanner}

// icons
let chevronDown1 = new Image(15,15)

chevronDown1.src = chevronDown

document.querySelector('.chevron').append(chevronDown1)

let chevronUp1 = new Image(15,15)
chevronUp1.src = chevronUp

function expandCollapseBanner(e) {

    if(e.target.classList.contains('banner')) {

        if(e.target.lastElementChild.classList.contains('visible')) {

            e.target.lastElementChild.classList.remove('visible')

            switchChevron('collapse')
        }
        
        else {
            e.target.lastElementChild.classList.add('visible')
            
            switchChevron('expand')
        }
    }
}

function switchChevron(direction) {

    let container = document.querySelector('.chevron')

    switch(direction) {

        case 'collapse':
            container.firstElementChild.remove()
            container.append(chevronDown1)
            break;
        case 'expand':
            container.firstElementChild.remove()
            container.append(chevronUp1)
    }
}