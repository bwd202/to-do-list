export default publishReminder

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

function getReminderData() { //organizes user input from modal into object

    let reminderTitle = document.querySelector('input#title').value

    let reminderNotes = document.querySelector('input#notes').value

    let reminderDueDate = document.querySelector('input#dueDate').value

    let reminderDueTime = document.querySelector('input#dueTime').value

    let reminderPriority = document.querySelector('select#priority').value

    let reminderList = document.querySelector('select#selectList').value

    // console.log(reminderPriority)

    return new Reminder({title:reminderTitle, notes:reminderNotes, dueDate:reminderDueDate, dueTime:reminderDueTime, priority:reminderPriority, list:reminderList})
}

function reminderHtml(obj) {  //makes reminder html from object

    let reminderWrapper = []

    let checkbox = document.createElement('input')
    
    checkbox.setAttribute('type','checkbox')

    let reminderTitle = document.createElement('h4')

    reminderTitle.innerHTML = obj.title

    let closeBtn = document.createElement('span')

    closeBtn.classList.add('button','close-btn')

    closeBtn.innerHTML = '&times;'

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

function publishReminder(obj) {// routes reminder to right list, shows reminder html on document

    let reminder = document.createElement('div')

    let _obj = obj ? obj : getReminderData() //obj param inc for testing
    
    let destinationList = _obj.list

    let container = document.querySelector('#' + destinationList)

    let defaultContainer = document.querySelector('#reminders')

    if(!container) {

        defaultContainer.append(reminder.append(reminderHtml(_obj)))

        return
    }

    container.append(reminder.append(reminderHtml(_obj)))

    // console.log(destinationList)
}