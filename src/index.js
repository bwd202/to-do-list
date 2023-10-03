import './style.css'
import { closeModal } from './modalControl'

class Reminder {

    constructor(title, notes, dueDate, dueTime, priority) {
        this.title = title
        this.notes = notes
        this.dueDate = dueDate
        this.dueTime = dueTime
        this.priority = priority
    }
}

let newReminderBtn = document.querySelector('#new-reminder')

let reminderModal = document.querySelector('#reminder-modal')

// reminderModal.classList.add('hidden')

let openModal = function() {
    // reminderModal.classList.remove('hidden')
    reminderModal.classList.add('visible')
}

let reminderModalCloseBtn = document.querySelector('#reminder-modal-close-btn')

let listModal = document.querySelector('#list-modal')

// EVENT LISTENERS

reminderModalCloseBtn.addEventListener('click', closeModal(reminderModal))

newReminderBtn.addEventListener('click', openModal)

window.addEventListener('click', (e) => {
    if (e.target === reminderModal || e.target === listModal) {
      closeModal()
    }
})