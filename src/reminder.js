export {publishReminder}
import { updateReminderCount } from "./list"
import { listStorage } from "./listStorage"

class Reminder {

    constructor({title="title", notes="notes", dueDate="dueDate", dueTime="dueTime", priority="medium", list="reminders", completed=false} = {}) {
        this.title = title
        this.notes = notes
        this.dueDate = dueDate
        this.dueTime = dueTime
        this.priority = priority
        this.destinationList = list
        this.completed = completed
    }

    get list() {
        return this.destinationList
    }

    set list(name) {
        this.destinationList = name
    }

}

function storeReminder(list, reminder) { //stores reminder

    listStorage[list] = reminder
}

function makeReminderObj() {
    
    return new Reminder(getReminderData())
}

function processReminder() {
    //store rem in list etc
}

function getReminderData() { //gets reminder data from modal, creates object from it

    let reminderTitle = document.querySelector('input#title').value

    let reminderNotes = document.querySelector('input#notes').value

    let reminderDueDate = document.querySelector('input#dueDate').value

    let reminderDueTime = document.querySelector('input#dueTime').value

    let reminderPriority = document.querySelector('select#priority').value

    let reminderList = document.querySelector('select#selectList').value

    // let reminderObj = new Reminder({title:reminderTitle, notes:reminderNotes, dueDate:reminderDueDate, dueTime:reminderDueTime, priority:reminderPriority, list:reminderList})

    // return reminderObj

    return {reminderTitle, reminderNotes, reminderDueDate, reminderDueTime, reminderPriority, reminderList}
}

function createHtml(obj) {  //uses obj props to create reminder html

    let reminderHtmlContent = []

    let checkbox = document.createElement('input')
    
    checkbox.setAttribute('type','checkbox')

    let reminderTitle = document.createElement('h4')

    reminderTitle.innerHTML = obj.title

    let closeBtn = document.createElement('span')

    closeBtn.classList.add('button','close-btn')

    closeBtn.innerHTML = '&times;'

    closeBtn.addEventListener('click', () => closeBtn.parentElement.remove())   //deletes reminder

    let reminderNotes = document.createElement('p')

    reminderNotes.innerHTML = obj.notes

    let reminderDueDate = document.createElement('p')

    reminderDueDate.innerHTML = obj.dueDate

    let reminderDueTime = document.createElement('p')

    reminderDueTime.innerHTML = obj.dueTime

    let reminderPriority = document.createElement('p')

    reminderPriority.innerHTML = obj.priority

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

// function addReminderToList() {
//      let list = 
// }

function publishReminder() {//shows reminder html on page

    let reminderHtmlWrapper = document.createElement('div')

    reminderHtmlWrapper.classList.add('reminder')

    let newReminder = getReminderData()

    // let currentReminder = reminderStorage.at(-1)

    // function getList() {

    //     let listName = newReminder.list

    //     return "#" + listName
    // }

    let reminderListId = "#" + newReminder.list

    let container = document.querySelector(reminderListId)

    reminderHtmlWrapper.append(...createHtml(newReminder))

    container.append(reminderHtmlWrapper)

    storeReminder(newReminder.list, newReminder)

    console.log(listStorage)

    let banner = container.parentElement

    updateReminderCount(banner)
}

