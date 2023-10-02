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

let newReminderBtnFn = function() {
    reminderModal.classList.remove('hidden')
    reminderModal.classList.add('visible')
}

let reminderModal = document.querySelector('#reminder-modal')

let modalCloseBtnFn = function() {
    reminderModal.classList.remove('visible');
    reminderModal.classList.add('hidden');
}

let modalCloseBtn = document.querySelector('#modal-close-btn')

// EVENT LISTENERS

modalCloseBtn.addEventListener('click', modalCloseBtnFn)

newReminderBtn.addEventListener('click', newReminderBtnFn)

window.addEventListener('click', (e) => {
    if (e.target === reminderModal) {
      modalCloseBtnFn()
    }
})



//   reminderModal.hidden = false

