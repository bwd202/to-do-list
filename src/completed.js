// deals with reminder completion feature
import { reminders } from "./storage";
export { crossOutHtml };

let completed = [];

function crossOutHtml(e) {

    if (e.target.type === "checkbox") {

        // console.log('checkbox clicked')

        e.target.nextElementSibling.classList.toggle("completed");

        let reminder = e.target.nextElementSibling.children[0].innerHTML;

        markComplete(reminder);
    }
}

function markComplete(item) {
    // sets reminderCompleted prop to true

    for(let i = 0; i < reminders.length; i++) {

        if(!reminders[i].reminderCompleted) {

            if(reminders[i].reminderTitle === item) {

                reminders[i].reminderCompleted = true
            } 

        } else if(reminders[i].reminderCompleted) {

            if(reminders[i].reminderTitle === item) {

                reminders[i].reminderCompleted = false
            }
        }
    }

    console.log(reminders);
}

function getCompleted(reminder) {
    // changes reminderCompleted prop

    for (let i = 0; i < reminders.length; i++) {
        if (reminder === reminders[i].reminderTitle) {
            if (!completed.includes(reminder)) {
                completed.push(reminders[i]);
            }
        }
    }

    console.log(completed);
}

function showCompleted() {
    // shows completed reminders in modal
}
