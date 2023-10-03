import './style.css'
// import { closeModal } from './modalControl'

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

function closeModal(modal) {

    return function(e) {
        console.log(e)
        modal.classList.remove('visible')
    }
   
}

// let closeModal = function() {

//     return function(e) {
//         // modal.classlist.remove('visible')
//         e.target.classlist.remove('visible')
//     }
   
// }

let modalCloseBtn = document.querySelector('#modal-close-btn')

let listModal = document.querySelector('#list-modal')

// EVENT LISTENERS

modalCloseBtn.addEventListener('click', closeModal(reminderModal))

newReminderBtn.addEventListener('click', openModal)

window.addEventListener('click', (e) => {
    if (e.target === reminderModal || e.target === listModal) {
      closeModal()
    }
})

// window.addEventListener('click', closeModal)