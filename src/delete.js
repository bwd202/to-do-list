import { reminders } from "./storage"
import { updateCounters } from "./banner"
export {deleteReminderHtml} 

function deleteReminderHtml(e) {

    if(e.target.classList.contains('del-btn')) {

        let btn = e.target
    
        let reminder = btn.parentElement

        let banner = reminder.parentElement.parentElement

        deleteReminderFromStorage(reminder.children[1].innerHTML)

        reminder.remove()

        updateCounters(banner)
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