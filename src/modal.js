export {openModal,closeModal}
import { allReminders } from "./storage"

function closeModal(e) {

    if(e.target.classList.contains('modal')) {

         e.target.classList.remove('visible')
    }

    else if (e.target.classList.contains('modal-close-btn')) {

        e.target.closest('.modal').classList.remove('visible')
    }

}

function openModal(e) {

    if(e.target.classList.contains('modal-btn')) {

        e.target.nextElementSibling.classList.add('visible')    //show modal

    }

}

function updateModals() {

    let today = document.querySelector('#today + .modal')

    let scheduled = document.querySelector('#scheduled + .modal')

    let all = document.querySelector('#all + .modal')

    let completed = document.querySelector('#completed + .modal')

}
