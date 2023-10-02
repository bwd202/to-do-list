import './style.css'

class Reminder {

    constructor(title, notes, dueDate, priority) {
        this.title = title
        this.notes = notes
        this.dueDate = dueDate
        this.priority = priority
    }
}

// console.log(new Reminder('helo',new Date(), 3))

let newReminderBtn = document.querySelector('#new-reminder')

// newReminderBtn.addEventListener('click', ()=> console.log('helo'))

let reminderModal = document.querySelector('#reminder-modal')

reminderModal.hidden = false