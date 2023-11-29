// deals with reminder completion feature
import { reminders } from "./storage";
import { makeLongReminder } from "./reminder";
export { crossOutHtml, showCompleted };

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

                purgeCompleted(reminders[i].reminderTitle)
            }
        }
    }

    // getCompleted()

    // console.log(reminders);

    showCompleted()
}

function getCompleted() {
    // creates array with completed reminders

    let completed = []

    for(let i = 0; i < reminders.length ; i++) {

        if(reminders[i].reminderCompleted) {

            completed.push(reminders[i])
        }
    }

    // console.log(completed)

    return completed.filter((obj, index) => completed.indexOf(obj) === index)
}

function purgeCompleted(reminder) {

    for(let i = 0; i < completed.length; i++) {

        if(completed.reminderTitle === reminder) {

            completed.splice(i,1)
        }
    }
}

function showCompleted(e) {

    console.log(e.target)

    // let completed = getCompleted()

    // let modal = e.target.firstElementChild.children[1]

    // return function() {

    //     for(let obj of completed) {

    //         modal.append(makeLongReminder(obj))
    //     }
    // }   
}
