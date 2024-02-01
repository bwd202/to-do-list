import { reminders } from "./storage"
import { Reminder, publishReminder } from "./reminder"
export {editReminder, saveEdit}

let modal = document.querySelector('#edit-reminder')

let reminderTitle = modal.querySelector('#title-edit')

let reminderNotes = modal.querySelector('#notes-edit')

let reminderDueDate = modal.querySelector('#date-edit')

let reminderDueTime = modal.querySelector('#time-edit')

let reminderPriority = modal.querySelector('#priority-edit')

let reminderList = modal.querySelector('#list-edit')

let tempStorage = []

function editReminder(e) {

    if(e.target.classList.contains('reminder-short')) {

        document.querySelector('#edit-reminder').classList.toggle('visible')
    
        let name = e.target.children[1].innerHTML

        let reminder = selectReminder(name)

        populateModal(reminder)

        tempStorage.push(reminder)

    }
}

function selectReminder(reminderName) {

    for(let item of reminders) {

        if(item.reminderTitle == reminderName) {

            return item
        }
    }
}

function overwriteReminder(original, edit) {

    Object.assign(original, edit)
}

function populateModal(reminderObject) {

    reminderTitle.value = reminderObject.reminderTitle

    reminderNotes.value = reminderObject.reminderNotes

    reminderDueDate.value = reminderObject.reminderDueDate

    reminderDueTime.value = reminderObject.reminderDueTime

    reminderPriority.value = reminderObject.reminderPriority

    reminderList.value = reminderObject.reminderList

}

function saveEdit(e) {

    e.preventDefault()

    let edit = new Reminder()

    edit.reminderTitle = reminderTitle.value

    edit.reminderNotes = reminderNotes.value

    edit.reminderDueDate = reminderDueDate.value

    edit.reminderDueTime = reminderDueTime.value

    edit.reminderPriority = reminderPriority.value

    edit.reminderList = reminderList.value

    overwriteReminder(tempStorage[0],edit)

    // reminders.push(edit)

    console.log(reminders)

    publishReminder(edit)

    let editForm = document.querySelector('#editForm')

    editForm.reset()
}
