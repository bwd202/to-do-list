export {openModal,closeModal,showInModal, completedModal}
import { reminderForModal } from "./reminder"

let completedModal = document.querySelector('#completed + .modal .modal-content')

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

function showInModal(reminder, modal) {

    modal.append(reminderForModal(reminder))

}