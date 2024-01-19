import { reminders } from "./storage"
import { updateCounter } from "./counter"
export {deleteReminderHtml, deleteFromStorage, removeFromModal} 

function deleteReminderHtml(e) {

    if(e.target.classList.contains('del-btn')) {

        let btn = e.target
    
        let reminder = btn.parentElement

        let banner = reminder.parentElement.parentElement

        let reminderName = reminder.children[1].innerHTML

        deleteFromStorage(reminderName, reminders)

        reminder.remove()

        updateCounter(banner)

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

function removeFromModal(reminder, modal) {

    for(let item of modal.children) {

        if(item.attributes[0].value === reminder) {    // data-title == <reminder's title>

            item.remove()
        }
    }
}