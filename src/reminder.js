export {publishReminder,Reminder}
import {reminderStorage} from "./storage"
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

    reminderStorage.push(getReminderData())
}

function createHtml(obj) {  //uses obj props to create reminder html

    let reminderHtmlWrapper = document.createElement('div')

    reminderHtmlWrapper.classList.add('reminder')

    let reminderHtmlContent = []

    let checkbox = document.createElement('input')
    
    checkbox.setAttribute('type','checkbox')

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

    // return reminderHtmlContent
}

function publishReminder(flag) {//event listener fn

    // if(flag) return

    return function() {
    
        storeReminder()

        let reminder = reminderStorage.at(-1)

        let listId = "#" + reminder.list

        let container = document.querySelector(listId)

        if(container.childElementCount === 0) { //shows drop-down by default after adding first reminder
            
            document.querySelector(listId).classList.add('visible')
        }

        createHtml(reminder)

        updateCounters(reminder.reminderList)

        reminderForm.reset()
    }
}