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

function addReminderToModal(id,item) {

    // let id = '#' + reminder

    switch(id) {

        case '#all':
            console.log('all')
            break;

        case '#scheduled':
            console.log('scheduled')
            break;

        case '#today':
            console.log('today')
            break;

        case '#completed':
            console.log('completed')
            break;

        case '#reminder-modal':
            console.log('reminder-modal')
            break;

        case '#list-modal':
            console.log('list-modal')
            break;

        default:
            console.log('modal')
    }
}


