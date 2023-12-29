import { reminders } from "./storage"
import { makeLongReminder } from "./reminder"
export {openModal,closeModal, showCompleted}

function closeModal(e) {

    if(e.target.classList.contains('modal')) {

         e.target.classList.remove('visible')
    }

    else if (e.target.classList.contains('modal-close-btn')) {

        e.target.closest('.modal').classList.remove('visible')
    }

}

function openModal(e) { //show modal

    if(e.target.classList.contains('modal-btn')) {

        e.target.nextElementSibling.classList.add('visible')
    }
}

function showCompleted() {

	let container = document.querySelector('#completed + .modal').firstElementChild.children[1]

	for(let item of reminders) {

		if(item.reminderCompleted) {

			// console.log(item)
			container.append(makeLongReminder(item))
		}
	}
}
