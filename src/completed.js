// deals with reminder completion feature
import { reminders } from "./storage"
export {crossOutHtml}

let completed = []

function crossOutHtml(e) {

    if(e.target.type === 'checkbox') {

        // console.log('checkbox clicked')

        e.target.nextElementSibling.classList.toggle('completed')

        let reminder = e.target.nextElementSibling.children[0].innerHTML

        getCompleted(reminder)
    } 
}

function getCompleted(reminder) {
    // changes reminderCompleted prop

    for(let i = 0; i < reminders.length; i++) {

        if(reminder === reminders[i].reminderTitle) {

            if(!completed.includes(reminder)) {

                completed.push(reminders[i])
            }
        }
    }
    
    markComplete()


    console.log(completed)
}

function markComplete() {
    // sets reminderCompleted prop to true

    for(let i = 0; i < completed.length; i++) {

        completed[i].reminderComplete = true
    }
}

function showCompleted() {
    // shows completed reminders in modal

}