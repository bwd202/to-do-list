import { reminders } from "./storage"
export {editReminder, saveEdit}

let modal = document.querySelector('#edit-reminder')

let reminderTitle = modal.querySelector('#title-edit')

let reminderNotes = modal.querySelector('#notes-edit')

let reminderDueDate = modal.querySelector('#date-edit')

let reminderDueTime = modal.querySelector('#time-edit')

let reminderPriority = modal.querySelector('#priority-edit')

let reminderList = modal.querySelector('#list-edit')

function editReminder(e) {

    if(e.target.classList.contains('reminder-short')) {

        document.querySelector('#edit-reminder').classList.toggle('visible')
    
        let reminderName = getReminderName(e.target)

        let reminderObject = selectReminder(reminderName)

        populateModal(reminderObject)
    }
}

function getReminderName(htmlObject) {

    return htmlObject.children[1].innerHTML
}

function selectReminder(reminderName) {

    for(let item of reminders) {

        if(item.reminderTitle == reminderName) {

            return item
        }
    }
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

    let reminderName = reminderTitle.value

    let reminder = selectReminder(reminderName)

    reminder.reminderTitle = reminderName

    reminder.reminderNotes = reminderNotes.value

    reminder.reminderDueDate = reminderDueDate.value

    reminder.reminderDueTime = reminderDueTime.value

    reminder.reminderPriority = reminderPriority.value

    reminder.reminderList = reminderList.value

    console.log(reminders)

    
}