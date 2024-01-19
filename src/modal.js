export {openModal,closeModal,showInModal, chooseModal}
import { reminderForModal } from "./reminder"

let completedModal = document.querySelector('#completed + .modal .modal-content')

function chooseModal(name) {    //returns appropriate html element

    switch(name) {
        case 'today':
            return document.querySelector('#today + .modal .modal-content')
        case 'scheduled':
            return document.querySelector('#scheduled + .modal .modal-content')
        case 'all':
            return document.querySelector('#all + .modal .modal-content')
        case 'completed':
            return document.querySelector('#completed + .modal .modal-content')
    }
}

function closeModal(e) {

    if(e.target.classList.contains('modal')) {

         e.target.classList.remove('visible')
    }

    else if (e.target.classList.contains('modal-close-btn')) {

        e.target.closest('.modal').classList.remove('visible')
    }

}

function openModal(e) { //show modal

    if(e.target.classList.contains('modal-btn')) {

        e.target.nextElementSibling.classList.add('visible')
    }
}

function showInModal(reminder, modalName) {

    let modalHtml = chooseModal(modalName)

    modalHtml.append(reminderForModal(reminder))

}