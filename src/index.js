import './index.html'
import './classes.css'
import './header.css'
import './main.css'
import './footer.css'
import { closeModal, openModal, toggleModal} from './modalControl'
import addListFn from './list'
import reminderFn from './reminder.js'

// UIs

let defaultList = document.querySelector('div.list-wrapper:first-of-type')

let reminders = document.querySelector('#reminders')

let newReminderBtn = document.querySelector('#new-reminder')

let reminderModal = document.querySelector('#reminder-modal')

let reminderModalCloseBtn = document.querySelector('#reminder-modal-close-btn')

let listModal = document.querySelector('#list-modal')

let listModalCloseBtn = document.querySelector('#list-modal-close-btn')

// EVENT LISTENERS

// Reminder Modal

document.querySelector('button#publishReminder').addEventListener('click', reminderFn)

defaultList.addEventListener('click', toggleModal(reminders))

reminderModalCloseBtn.addEventListener('click', closeModal(reminderModal))

listModalCloseBtn.addEventListener('click', closeModal(listModal))

newReminderBtn.addEventListener('click', openModal(reminderModal))

// from Html id
openListModal.addEventListener('click', openModal(listModal))

addList.addEventListener('click', addListFn)

// testing
let testEvent = new Event('click')

addList.dispatchEvent(testEvent)

window.addEventListener('click', (e) => {

    let modal = e.target

    if(modal.id === "reminder-modal") {

        closeModal(reminderModal)()

    } else if(modal.id === 'list-modal') {

        closeModal(listModal)() //invokes the "inner" function
    }
})