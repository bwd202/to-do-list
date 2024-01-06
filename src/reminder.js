export {publishReminder,Reminder,deleteReminderFromStorage,deleteReminderHtml,reminderForModal}
import {reminders} from "./storage"
import { updateCounters } from "./counters"
import { appendChevronIcon } from "./banner"

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

    let title = document.querySelector('#reminderForm input:first-of-type').value

    let notes = document.querySelector('#reminderForm input:nth-of-type(2)').value

    let dueDate = document.querySelector('#reminderForm input:nth-of-type(3)').value

    let dueTime = document.querySelector('#reminderForm input:nth-of-type(4)').value

    let priority = document.querySelector('#reminderForm select:first-of-type').value

    let list = document.querySelector('#reminderForm select:nth-of-type(2)').value

    return new Reminder({title,notes,dueDate,dueTime,priority,list})
}

function storeReminder() {

    reminders.push(getReminderData())

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

    button.classList.add('button','del-btn')

    button.innerHTML = '&times;'

    let listId = "#" + obj.list

    let container = document.querySelector(listId)

    content.push(checkbox,info,button)

    wrapper.append(...content)

    container.append(wrapper)
}

function reminderForModal(obj) {  //creates html elements

    let reminderHtmlWrapper = document.createElement('div')

    reminderHtmlWrapper.setAttribute('data-title', obj.reminderTitle)

    reminderHtmlWrapper.classList.add('reminder')

    let reminderHtmlContent = []

    let checkbox = document.createElement('input')
    
    checkbox.setAttribute('type','checkbox')

    let reminderTitle = document.createElement('h4')

    reminderTitle.innerHTML = obj.reminderTitle

    let closeBtn = document.createElement('span')

    closeBtn.classList.add('button','del-btn')

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

function publishReminder(e) {//event listener fn

    // e.preventDefault()
    
        storeReminder()

        let reminder = reminders.at(-1)

        let listId = "#" + reminder.list

        let accordion = document.querySelector(listId)

        if(accordion.childElementCount === 0) { //shows drop-down by default after adding first reminder

            let banner = accordion.parentElement

            let chevronSpan = banner.children[3]

            if(!chevronSpan.firstChild) {   //prevents adding extra chevron icons (bug)

                appendChevronIcon(chevronSpan)

            }
            
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

    if(e.target.classList.contains('del-btn')) {

        let btn = e.target
    
        let reminder = btn.parentElement

        deleteReminderFromStorage(btn.previousElementSibling.children[0].innerHTML) //matches h4 text to reminderTitle prop value

        updateCounters(reminder.parentElement.id)

        reminder.remove()
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

// function getCompleted(e) {

//     let title = e.target.nextElementSibling.children[0].innerHTML

//     let completed = []

//     for(let i = 0; i < reminders.length; i++) {

//         let reminder = reminders[i]
        
//         if(title === reminder.reminderTitle) {

//             if(!completed.includes(reminder)) {

//                 completed.push(reminder)
//             }            
//         }
//     }
// }