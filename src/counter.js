export {updateCounter, updateModalCounter}
import {chooseModal} from './modal'

function updateCounter(banner) {

    let dropDown = banner.lastElementChild
   
    banner.querySelector('.counter').innerHTML = dropDown.children.length
    
}

function updateModalCounter(modalName) {

    let modalHtml = chooseModal(modalName)

    let counter = modalHtml.parentElement.previousElementSibling.querySelector('.counter')

    counter.innerHTML = modalHtml.children.length
}