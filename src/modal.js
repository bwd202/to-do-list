export {openModal,closeModal,updateModals}
import {reminders} from "./storage"
import {makeLongReminder} from './reminder'

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

    let todayModal = document.querySelector('#today + .modal')

    let scheduledModal = document.querySelector('#scheduled + .modal')

    let allModal = document.querySelector('#all + .modal')

    let completedModal = document.querySelector('#completed + .modal')

    let completedReminders = filterCompleted()

    for(let i = 0; i < completedReminders.length; i++) {

        completedModal.closest('modal-content').append(makeLongReminder(completedReminders[i]))

    }

}

function filterCompleted() {

    let completed = reminders.filter(item => item.reminderCompleted === true)

    return completed
}
