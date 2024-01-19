export {crossOutCompleted}
import { completed, reminders } from "./storage"
import { showInModal} from "./modal"
import {deleteFromStorage, removeFromModal}  from './delete'
import { updateModalCounter } from "./counter"

function crossOutCompleted(e) {

	if (e.target.type === 'checkbox') {

        e.target.parentElement.children[1].classList.toggle('completed')
        e.target.parentElement.children[2].classList.toggle('completed')
        e.target.parentElement.children[3].classList.toggle('completed')
        e.target.parentElement.children[4].classList.toggle('completed')

        let reminderName = e.target.parentElement.children[1].innerHTML
        
        checkCompleted(reminderName)

	}

    updateModalCounter('completed')

}

function checkCompleted(reminder) {

    for(let item of reminders) {

        if(item.reminderTitle === reminder && item.reminderCompleted === false) {

            item.reminderCompleted = true

            pushCompleted(item)
        }

        else if(item.reminderTitle === reminder && item.reminderCompleted === true) {

            deleteFromStorage(reminder, completed)

            removeFromModal(reminder, 'completed')

            item.reminderCompleted = false

        }
    }
}

function pushCompleted(reminder) {

    // Array.findIndex()
    function completedTest() {

       let test = completed.findIndex(item => item.reminderTitle === reminder)

       return test
    }

    if(completedTest() === -1) completed.push(reminder) // tests true if reminder is not found in array

    showInModal(reminder, 'completed')

}