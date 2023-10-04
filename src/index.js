import './index.html'
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

// UIs

let newReminderBtn = document.querySelector('#new-reminder')

let addListBtn = document.querySelector('#add-list')

let reminderModal = document.querySelector('#reminder-modal')

let reminderModalCloseBtn = document.querySelector('#reminder-modal-close-btn')

let listModal = document.querySelector('#list-modal')

let listModalCloseBtn = document.querySelector('#list-modal-close-btn')

// EVENT LISTENERS

reminderModalCloseBtn.addEventListener('click', closeModal(reminderModal))

listModalCloseBtn.addEventListener('click', closeModal(listModal))

newReminderBtn.addEventListener('click', openModal(reminderModal))

addListBtn.addEventListener('click', openModal(listModal))

window.addEventListener('click', (e) => {

    let modal = e.target

    if(modal.id === "reminder-modal") {

        closeModal(reminderModal)()

    } else if(modal.id === 'list-modal') {

        closeModal(listModal)() //invokes the "inner" function
    }
})


