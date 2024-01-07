import { updateCounters } from "./counters"
import { reminders } from "./storage"
export {deleteReminderHtml} 

function deleteReminderHtml(e) {

    if(e.target.classList.contains('del-btn')) {

        let btn = e.target
    
        let reminder = btn.parentElement

        deleteReminderFromStorage(btn.previousElementSibling.children[0].innerHTML) //matches h4 text to reminderTitle prop value

        updateCounters(reminder.parentElement.id)

        reminder.remove()
    }
}

function deleteReminderFromStorage(name) {

    for(let i = 0; i < reminders.length; i++) {

        if(name === reminders[i].reminderTitle) {

            reminders.splice(i, 1)
        }
    }

    console.log(reminders)
}