export {crossOutCompleted}
import { completed, reminders } from "./storage"

function crossOutCompleted(e) {

	if (e.target.type === 'checkbox') {

		e.target.nextElementSibling.classList.toggle('completed')

		let reminder = e.target.nextElementSibling.children[0].innerHTML
        
        checkCompleted(reminder)
	}
}

function checkCompleted(reminder) {

    for(let item of reminders) {

        if(item.reminderTitle === reminder && item.reminderCompleted === false) {

            item.reminderCompleted = true

            pushCompleted(item)
        }

        else if(item.reminderTitle === reminder && item.reminderCompleted === true) {

            removeCompleted(reminder)

            item.reminderCompleted = false

        }
        
    }

    // console.log(completed)
}

function removeCompleted(item) {

    // Array.indexOf()
    for(let target of completed) {

        if(target.reminderTitle === item) {

            let index = completed.indexOf(target)

            completed.splice(index, 1)
        }
    }

    console.log(completed)

}

function pushCompleted(reminder) {

    // Array.findIndex()
    function completedTest() {

       let test = completed.findIndex(obj => obj.reminderTitle === reminder)

       return test
    }

    if(completedTest() === -1) completed.push(reminder)

    console.log(completed)
}

