import './style.css'
import { closeModal, openModal } from './modalControl'

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

let addListBtn = document.querySelector('#add-list')

let reminderModal = document.querySelector('#reminder-modal')

let reminderModalCloseBtn = document.querySelector('#reminder-modal-close-btn')

let listModal = document.querySelector('#list-modal')

let listModalCloseBtn = document.querySelector('#reminder-modal-close-btn')

// EVENT LISTENERS

reminderModalCloseBtn.addEventListener('click', closeModal(reminderModal))

listModalCloseBtn.addEventListener('click', closeModal(listModal))

newReminderBtn.addEventListener('click', openModal(reminderModal))

addListBtn.addEventListener('click', openModal(listModal))

window.addEventListener('click', (e) => {

    if(e.target.id === "reminder-modal" || e.target.id === "list-modal") {
        
        if(e.target.id === 'reminder-modal') {

            closeModal(reminderModal)

        } else closeModal(listModal)
         
    }
})

