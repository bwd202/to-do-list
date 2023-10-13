

class Reminder {

    constructor({title="title", notes="notes", dueDate="dueDate", dueTime="dueTime", priority="medium"} = {}) {
        this.title = title
        this.notes = notes
        this.dueDate = dueDate
        this.dueTime = dueTime
        this.priority = priority
    }

}

let reminderHtml = function() {

    let wrapper = new DocumentFragment()

    let reminderTitle = document.querySelector('input#title').value

    let reminderNotes = document.querySelector('input#notes').value

    let reminderDueDate = document.querySelector('input#dueDate').value






    return wrapper
}