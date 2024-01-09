export {crossOutCompleted}
import { completed, reminders } from "./storage"
import { reminderForModal } from "./reminder"

let completedModal = document.querySelector('#completed + .modal .modal-content')

function crossOutCompleted(e) {

	if (e.target.type === 'checkbox') {

        e.target.parentElement.children[1].classList.toggle('completed')
        e.target.parentElement.children[2].classList.toggle('completed')
        e.target.parentElement.children[3].classList.toggle('completed')
        e.target.parentElement.children[4].classList.toggle('completed')

        let reminderName = e.target.parentElement.children[1].innerHTML
        
        checkCompleted(reminderName)

	}
}

function checkCompleted(reminder) {

    for(let item of reminders) {

        if(item.reminderTitle === reminder && item.reminderCompleted === false) {

            item.reminderCompleted = true

            pushCompleted(item)
        }

        else if(item.reminderTitle === reminder && item.reminderCompleted === true) {

            deleteCompleted(reminder)

            item.reminderCompleted = false

        }
    }
}

function deleteCompleted(reminder) {    //removes from completed array

    // Array.indexOf()
    for(let item of completed) {

        if(item.reminderTitle === reminder) {

            let index = completed.indexOf(item)

            completed.splice(index, 1)

            removeFromModal(reminder)

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

    showInModal(reminder)

}

function showInModal(reminder) {

    completedModal.append(reminderForModal(reminder))

}

function removeFromModal(reminder) {

    for(let item of completedModal.children) {

        if(item.attributes[0].value === reminder) {    // data-title: <reminder's title>

            item.remove()
        }
    }
}