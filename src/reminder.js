export {Reminder, publishReminder}

class Reminder {

    constructor({title="title", notes="notes", dueDate="dueDate", dueTime="dueTime", priority="medium", list="default"} = {}) {
        this.title = title
        this.notes = notes
        this.dueDate = dueDate
        this.dueTime = dueTime
        this.priority = priority
        this.list = list
    }

}

let reminders = []

function getReminderData() { //organizes user input from modal into object, pushes object to array for storage

    let reminderTitle = document.querySelector('input#title').value

    let reminderNotes = document.querySelector('input#notes').value

    let reminderDueDate = document.querySelector('input#dueDate').value

    let reminderDueTime = document.querySelector('input#dueTime').value

    let reminderPriority = document.querySelector('select#priority').value

    let reminderList = document.querySelector('select#selectList').value

    let reminderObj = new Reminder({title:reminderTitle, notes:reminderNotes, dueDate:reminderDueDate, dueTime:reminderDueTime, priority:reminderPriority, list:reminderList})

    // console.log(reminderPriority)

    reminders.push(reminderObj)

    return reminderObj
}

function reminderHtml(obj) {  //shows obj information as html

    let reminderWrapper = []

    let checkbox = document.createElement('input')
    
    checkbox.setAttribute('type','checkbox')

    let reminderTitle = document.createElement('h4')

    reminderTitle.innerHTML = obj.title

    let closeBtn = document.createElement('span')

    closeBtn.classList.add('button','close-btn')

    closeBtn.innerHTML = '&times;'

    // closeBtn.addEventListener('click', () => )

    let reminderNotes = document.createElement('p')

    reminderNotes.innerHTML = obj.notes

    let reminderDueDate = document.createElement('p')

    reminderDueDate.innerHTML = obj.dueDate

    let reminderDueTime = document.createElement('p')

    reminderDueTime.innerHTML = obj.dueTime

    let reminderPriority = document.createElement('p')

    reminderPriority.innerHTML = obj.priority

    reminderWrapper.push(checkbox,reminderTitle,closeBtn,reminderNotes,reminderDueDate,reminderDueTime,reminderPriority)

    // console.log(reminder)

    return reminderWrapper

}

function publishDefaultReminder() {

    document.querySelector('#defaultList').classList.add('visible') //shows drop-down by default

    let defaultReminder = new Reminder({title:'Take trash out',notes:"Notes"})

    document.querySelector('button#publishReminder').addEventListener('click', publishReminder(defaultReminder))

    let clickEvent = new Event('click')

    document.querySelector('button#publishReminder').dispatchEvent(clickEvent)

} 

function publishReminder(obj) {// routes reminder to right list, shows reminder html on document

    return function() {

        let reminder = document.createElement('div')

        reminder.classList.add('reminder')
    
        let _obj = obj
    
        if(!obj) _obj = getReminderData()
    
        // console.log(obj)
        
        let destinationList = '#' + _obj.list //add fix for when _obj.list is blank
    
        // console.log(destinationList)
    
        let container = document.querySelector(destinationList)
    
        let defaultContainer = document.querySelector('#defaultList')
    
        if(!container) {
    
            defaultContainer.append(reminder)
    
            reminder.append(...reminderHtml(_obj))
    
            return
        }
    
        container.append(reminder)
        reminder.append(...reminderHtml(_obj))
    
        // console.log(destinationList)
    }

  
}