export {publishReminder,updateCounters}
import {reminderStorage} from "./storage"

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

    reminderHtmlContent.push(checkbox,reminderTitle,closeBtn,reminderNotes,reminderDueDate,reminderDueTime,reminderPriority)

    return reminderHtmlContent
}

// function publishDefaultReminder() {

//     document.querySelector('#defaultList').classList.add('visible') //shows drop-down by default

//     let defaultReminder = new Reminder({title:'Take trash out',notes:"Notes"})

//     document.querySelector('button#publishReminder').addEventListener('click', publishReminder(defaultReminder))

//     let clickEvent = new Event('click')

//     document.querySelector('button#publishReminder').dispatchEvent(clickEvent)

// } 

function publishReminder() {//shows reminder html on page

    storeReminder()

    let reminderHtmlWrapper = document.createElement('div')

    reminderHtmlWrapper.classList.add('reminder')

    let reminder = reminderStorage.at(-1)

    let reminderListId = "#" + reminder.reminderList

    let container = document.querySelector(reminderListId)

    let reminderHtml = createHtml(reminder)

    reminderHtmlWrapper.append(...reminderHtml)

    updateCounters(reminder.reminderList)

    if(container.childElementCount === 0) { //shows drop-down by default after adding first reminder to a list
        
        document.querySelector(reminderListId).classList.add('visible')
    }

    container.append(reminderHtmlWrapper)

    // console.log(reminderStorage)
}

function updateCounters(list) {
   
    let banner = document.querySelector('#' + list).parentElement

    let reminderCounter = banner.querySelector('.counter')

    reminderCounter.innerHTML = countReminders(list)
}

function countReminders(list) {

    let filtered = reminderStorage.filter(item => item.reminderList === list)

    return filtered.length
}