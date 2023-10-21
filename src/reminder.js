export {publishReminder}

class Reminder {

    constructor({title="title", notes="notes", dueDate="dueDate", dueTime="dueTime", priority="medium", list="default", completed=false} = {}) {
        this.title = title
        this.notes = notes
        this.dueDate = dueDate
        this.dueTime = dueTime
        this.priority = priority
        this.list = list
        this.completed = completed
    }

}

let reminderStorage = []

function storeReminder(arr, reminder) {
    arr.push(reminder)
}

function getReminderData() { //gets reminder info from modal, pushes reminder to storage

    let reminderTitle = document.querySelector('input#title').value

    let reminderNotes = document.querySelector('input#notes').value

    let reminderDueDate = document.querySelector('input#dueDate').value

    let reminderDueTime = document.querySelector('input#dueTime').value

    let reminderPriority = document.querySelector('select#priority').value

    let reminderList = document.querySelector('select#selectList').value

    let reminderObj = new Reminder({title:reminderTitle, notes:reminderNotes, dueDate:reminderDueDate, dueTime:reminderDueTime, priority:reminderPriority, list:reminderList})

    storeReminder(reminderStorage, reminderObj)

    // return reminderObj
}

function createHtml(obj) {  //creates html from reminder obj

    let reminderWrapper = []

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

    reminderWrapper.push(checkbox,reminderTitle,closeBtn,reminderNotes,reminderDueDate,reminderDueTime,reminderPriority)

    return reminderWrapper
}

// function publishDefaultReminder() {

//     document.querySelector('#defaultList').classList.add('visible') //shows drop-down by default

//     let defaultReminder = new Reminder({title:'Take trash out',notes:"Notes"})

//     document.querySelector('button#publishReminder').addEventListener('click', publishReminder(defaultReminder))

//     let clickEvent = new Event('click')

//     document.querySelector('button#publishReminder').dispatchEvent(clickEvent)

// } 

function publishReminder() {//shows reminder object html

    let reminder = document.createElement('div')

    reminder.classList.add('reminder')

    getReminderData()

    for(let item of reminderStorage) {

        let reminderListId = "#" + item.list

        let container = document.querySelector(reminderListId)

        container.classList.add('reminder')

        container.append(...createHtml(item))
    }



    // return function() {

    //     let reminder = document.createElement('div')
    
    //     let _obj = obj
    
    //     if(!obj) _obj = getReminderData()
            
    //     let destinationList = '#' + _obj.list //add fix for when _obj.list is blank
        
    //     let container = document.querySelector(destinationList)
    
    //     let defaultContainer = document.querySelector('#defaultList')
    
    //     if(!container) {
    
    //         defaultContainer.append(reminder)
    
    //         reminder.append(...createHtml(_obj))
    
    //         return
    //     }
    
    //     container.append(reminder)
    //     reminder.append(...createHtml(_obj))
    //     // countReminders()
    // }
}