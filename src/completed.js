// deals with reminder completion feature
import { reminders } from "./storage";
export { crossOutHtml };

function crossOutHtml(e) {

    if (e.target.type === "checkbox") {

        e.target.nextElementSibling.classList.toggle("completed");

        let reminder = e.target.nextElementSibling.children[0].innerHTML;

        markComplete(reminder);

    }
}

function markComplete(item) {
    // switches reminderCompleted prop based on item checked

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

    getCompleted()

    // console.log(reminders);
}

function getCompleted() {
    // creates array with completed reminders

    let completed = []

    for(let i = 0; i < reminders.length ; i++) {

        if(reminders[i].reminderCompleted) {

            completed.push(reminders[i])
        }
    }

    console.log(completed)
}
