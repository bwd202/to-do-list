import { reminders } from "./storage"
import { updateCounter, updateModalCounter } from "./counter"
import { removeFromModal } from "./modal"
export {deleteReminderHtml, deleteFromStorage} 

function deleteReminderHtml(e) {

    if(e.target.classList.contains('del-btn')) {

        let btn = e.target
    
        let reminder = btn.parentElement

        let banner = reminder.parentElement.parentElement

        let reminderName = reminder.children[1].innerHTML

        deleteFromStorage(reminderName, reminders)
        
        reminder.remove()

        removeFromModal(reminderName, 'all')

        removeFromModal(reminderName, 'completed')

        updateCounter(banner)

        updateModalCounter('all')

    }
}

function deleteFromStorage(reminder, array) {    //removes from array

    // Array.indexOf()
    for(let item of array) {

        if(item.reminderTitle === reminder) {

            let index = array.indexOf(item)

            array.splice(index, 1)

        }
    }
}