import './style.css'

class Reminder {

    constructor(title, notes, dueDate, dueTime, priority) {
        this.title = title
        this.notes = notes
        this.dueDate = dueDate
        this.dueTime = dueTime
        this.priority = priority
    }
}

// console.log(new Reminder('helo',new Date(), 3))

let newReminderBtn = document.querySelector('#new-reminder')

let reminderModal = document.querySelector('#reminder-modal')

reminderModal.classList.add('hidden')

let openModal = function() {
    reminderModal.classList.remove('hidden')
    reminderModal.classList.add('visible')
}

let closeModal = function() {
    reminderModal.classList.remove('visible');
    reminderModal.classList.add('hidden');
}

let modalCloseBtn = document.querySelector('#modal-close-btn')

let listModal = document.querySelector('#list-modal')

listModal.hidden = false

// EVENT LISTENERS

modalCloseBtn.addEventListener('click', closeModal)

newReminderBtn.addEventListener('click', openModal)

window.addEventListener('click', (e) => {
    if (e.target === reminderModal) {
      closeModal()
    }
})

