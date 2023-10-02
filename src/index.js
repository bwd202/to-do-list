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

newReminderBtn.addEventListener('click', newReminderBtnFn)

let reminderModal = document.querySelector('#reminder-modal')

window.onclick = function (e) {
    if (e.target === reminderModal) {
      reminderModal.classList.remove('visible');
      reminderModal.classList.add('hidden');
    }
  }

  reminderModal.hidden = false
