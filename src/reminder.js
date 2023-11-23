export {publishReminder,Reminder,deleteReminderFromStorage,deleteReminderHtml,makeLongReminder,showCompleted}
import {reminders} from "./storage"
import { updateCounters } from "./counters"
import { updateModals } from "./modal"

class Reminder {

    constructor({title="title", notes="notes", dueDate="dueDate", dueTime="dueTime", priority="medium", list="reminders", today=false, scheduled=false, all=true, completed=false} = {}) {
        this.reminderTitle = title
        this.reminderNotes = notes
        this.reminderDueDate = dueDate
        this.reminderDueTime = dueTime
        this.reminderPriority = priority
        this.reminderList = list
        this.reminderToday = today
        this.reminderScheduled = scheduled
        this.reminderAll = all
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

    reminders.push(getReminderData())

    // console.log(reminderStorage)
}

function deleteReminderFromStorage(name) {

    for(let i = 0; i < reminders.length; i++) {

        if(name === reminders[i].reminderTitle) {

            reminders.splice(i, 1)
        }
    }

    // console.log(reminderStorage)
}

function makeShortReminder(obj) {   //creates html

    let wrapper = document.createElement('div')

    wrapper.classList.add('reminder-short')

    let content = []

    let checkbox = document.createElement('input')
    
    checkbox.setAttribute('type','checkbox')

    // checkbox.addEventListener('change', markComplete)

    let info = document.createElement('div')

    let title = document.createElement('h4')

    title.innerHTML = obj.reminderTitle

    // let notes = document.createElement('p')

    // notes.innerHTML = obj.reminderNotes

    let date = document.createElement('p')

    date.innerHTML = obj.reminderDueDate

    let time = document.createElement('p')

    time.innerHTML = obj.reminderDueTime

    let priority = document.createElement('p')

    priority.innerHTML = obj.reminderPriority

    info.append(title,date,time,priority)

    let button = document.createElement('span')

    button.classList.add('button','close-btn')

    button.innerHTML = '&times;'

    let listId = "#" + obj.list

    let container = document.querySelector(listId)

    content.push(checkbox,info,button)

    wrapper.append(...content)

    container.append(wrapper)
}

function makeLongReminder(obj) {  //html reminder for modal categories

    let reminderHtmlWrapper = document.createElement('div')

    reminderHtmlWrapper.classList.add('reminder')

    let reminderHtmlContent = []

    let checkbox = document.createElement('input')
    
    checkbox.setAttribute('type','checkbox')

    // checkbox.addEventListener('change', markComplete)

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

    // let reminderListId = "#" + obj.list

    // let container = document.querySelector(reminderListId)

    reminderHtmlContent.push(checkbox,reminderTitle,closeBtn,reminderNotes,reminderDueDate,reminderDueTime,reminderPriority)

    reminderHtmlWrapper.append(...reminderHtmlContent)

    return reminderHtmlWrapper

    // container.append(reminderHtmlWrapper)
}

function publishReminder() {//event listener fn
    
        storeReminder()

        let reminder = reminders.at(-1)

        let listId = "#" + reminder.list

        let container = document.querySelector(listId)

        if(container.childElementCount === 0) { //shows drop-down by default after adding first reminder
            
            document.querySelector(listId).classList.add('visible')
        }

        // makeHtmlReminder(reminder)

        makeShortReminder(reminder)

        // makeShortReminder(new Reminder())

        // addReminderToModal()

        // console.log(reminders)

        updateCounters(reminder.reminderList)

        reminderForm.reset()
}

// function filterReminders(modal) {

//     // let today = filter by dueDate matches today's date

//     // let scheduled filter all reminders with dueDate

//     let all = reminders.slice()

//     let completed = reminders.filter(item => item.reminderCompleted === true)

//     switch(modal) {

//         case 'all':
//             return all

//         case 'completed':
//             return completed
//     }

// }

function deleteReminderHtml(e) {

    let closeBtn = e.target
    
    let reminder = closeBtn.parentElement

    if(closeBtn.classList.contains('close-btn')) {

        deleteReminderFromStorage(closeBtn.previousElementSibling.innerHTML) //matches html reminder's h4 to reminderTitle prop

        updateCounters(reminder.parentElement.id)

        reminder.remove()
    }
}

function addReminderToModal(modal, reminder) {

    switch(modal) {
        case 'completed':
            document.querySelector('#completed + .modal').firstElementChild.children[1].append(makeLongReminder(reminder))
            break;
    }
}

function removeReminderFromModal(modal, reminder) {

    switch(modal) {
        case 'completed':
            document.querySelector('#completed + .modal').firstElementChild.children[1].remove(reminder)
            break;
    }
}

function showCompleted(arr) {   // shows reminders in modal

    for(let i = 0; i < arr.length; i++) {

            document.querySelector('#completed + .modal').firstElementChild.children[1].append(makeLongReminder(arr[i]))
        }
    }

function getCompleted(e) {

    let title = e.target.nextElementSibling.children[0].innerHTML

    let completed = []

    for(let i = 0; i < reminders.length; i++) {

        let reminder = reminders[i]
        
        if(title === reminder.reminderTitle) {

            if(!completed.includes(reminder)) {

                completed.push(reminder)
            }            
        }
    }
}