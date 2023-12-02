import { chevronDown1, chevronUp1 } from "./icon"
export {expandCollapseBanner}

document.querySelector('.chevron').append(chevronDown1)

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