export {publishReminder,Reminder,reminderForModal}
import {reminders} from "./storage"
import { appendChevronIcon, updateCounters } from "./banner"

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

    get listId() {
        return '#' + this.reminderList
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



function makeShortReminder(obj) {   //makes reminder html to be shown in list accordion

    let box = document.createElement('div')

    box.classList.add('reminder-short')

    let wrapper = []

    let checkbox = document.createElement('input')
    
    checkbox.setAttribute('type','checkbox')

    let content = document.createElement('div')

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

    let button = document.createElement('span')

    button.classList.add('button','del-btn')

    button.innerHTML = '&times;'

    content.append(checkbox,title,date,time,priority,button)

    wrapper.push(content)

    box.append(...wrapper)

    return box
}

function reminderForModal(obj) { 

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

}

function publishReminder(test) {

   return function(e) { 

        if(test) {  //test function

            e.preventDefault()

            let testReminder = new Reminder()

            makeShortReminder(testReminder)

            return
        }

            e.preventDefault()
    
            storeReminder()

            let reminder = reminders.at(-1)
    
            let list = reminder.listId
    
            let accordion = document.querySelector(list)
    
            if(accordion.childElementCount === 0) { //shows drop-down by default after adding first reminder
    
                let banner = accordion.parentElement
    
                let chevronSpan = banner.children[3]
    
                if(!chevronSpan.firstChild) {   //prevents adding extra chevron icons (bug)
    
                    appendChevronIcon(chevronSpan)
    
                }
                
                document.querySelector(list).classList.add('visible')
            }

            accordion.append(makeShortReminder(reminder))
        
            updateCounters(list)
    
            reminderForm.reset()
    }

}