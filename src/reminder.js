export {publishReminder,Reminder,deleteReminderFromStorage,deleteReminderHtml}
import {allReminders} from "./storage"
import { updateCounters } from "./counters"

class Reminder {

    constructor({title="title", notes="notes", dueDate="dueDate", dueTime="dueTime", priority="medium", list="reminders", completed=false} = {}) {
        this.reminderTitle = title
        this.reminderNotes = notes
        this.reminderDueDate = dueDate
        this.reminderDueTime = dueTime
        this.reminderPriority = priority
        this.reminderList = list
        this.reminderCompleted = completed
    }

    get list() {
        return this.reminderList
    }

    set list(name) {
        this.reminderList = name
    }

}

function getReminderData() { //gets inputs from reminder form, makes new obj

    let title = document.querySelector('input#title').value

    let notes = document.querySelector('input#notes').value

    let dueDate = document.querySelector('input#dueDate').value

    let dueTime = document.querySelector('input#dueTime').value

    let priority = document.querySelector('select#priority').value

    let list = document.querySelector('select#selectList').value

    return new Reminder({title,notes,dueDate,dueTime,priority,list})
}

function storeReminder() {

    allReminders.push(getReminderData())

    // console.log(reminderStorage)
}

function deleteReminderFromStorage(name) {

    for(let i = 0; i < allReminders.length; i++) {

        if(name === allReminders[i].reminderTitle) {

            allReminders.splice(i, 1)
        }
    }

    // console.log(reminderStorage)
}

function makeHtmlReminder1(obj) {  //uses obj props to create reminder html

    let reminderHtmlWrapper = document.createElement('div')

    reminderHtmlWrapper.classList.add('reminder')

    let reminderHtmlContent = []

    let checkbox = document.createElement('input')
    
    checkbox.setAttribute('type','checkbox')

    checkbox.addEventListener('change', markComplete)

    let reminderTitle = document.createElement('h4')

    reminderTitle.innerHTML = obj.reminderTitle

    let closeBtn = document.createElement('span')

    closeBtn.classList.add('button','close-btn')

    closeBtn.innerHTML = '&times;'

    let reminderNotes = document.createElement('p')

    reminderNotes.innerHTML = obj.reminderNotes

    let reminderDueDate = document.createElement('p')

    reminderDueDate.innerHTML = obj.reminderDueDate

    let reminderDueTime = document.createElement('p')

    reminderDueTime.innerHTML = obj.reminderDueTime

    let reminderPriority = document.createElement('p')

    reminderPriority.innerHTML = obj.reminderPriority

    let reminderListId = "#" + obj.list

    let container = document.querySelector(reminderListId)

    reminderHtmlContent.push(checkbox,reminderTitle,closeBtn,reminderNotes,reminderDueDate,reminderDueTime,reminderPriority)

    reminderHtmlWrapper.append(...reminderHtmlContent)

    container.append(reminderHtmlWrapper)
}

function publishReminder(flag) {//event listener fn

    // if(flag) return

    return function() {
    
        storeReminder()

        let reminder = allReminders.at(-1)

        let listId = "#" + reminder.list

        let container = document.querySelector(listId)

        if(container.childElementCount === 0) { //shows drop-down by default after adding first reminder
            
            document.querySelector(listId).classList.add('visible')
        }

        makeHtmlReminder1(reminder)

        updateCounters(reminder.reminderList)

        reminderForm.reset()
    }
}

function deleteReminderHtml(e) {

    let closeBtn = e.target
    
    let reminder = closeBtn.parentElement

    if(closeBtn.classList.contains('close-btn')) {

        deleteReminderFromStorage(closeBtn.previousElementSibling.innerHTML) //matches html reminder's h4 to reminderTitle prop

        updateCounters(reminder.parentElement.id)

        reminder.remove()
    }
}

function makeHtmlReminder2(reminderObj){

    let container = document.createElement('div')

    container.classList.add('reminder')

    let title = document.createElement('h4')

    title.innerHTML = reminderObj.reminderTitle
}

function markComplete(e) {

    e.target.nextElementSibling.classList.toggle('completed')
}

function getReminderFrom(arr) {

    for(let i = 0; i < arr.length; i++) {

        // make reminder html fn
        makeHtmlReminder2(arr[i])

        // append reminder to document fn
    }
}