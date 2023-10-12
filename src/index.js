import './index.html'
import './classes.css'
import './header.css'
import './main.css'
import './footer.css'
import { closeModal, openModal, toggleModal} from './modalControl'
import { listHtml } from './list'

// UIs

let reminderList = document.querySelector('#reminder-list')

let reminders = document.querySelector('#reminders')

let newReminderBtn = document.querySelector('#new-reminder')

let addListBtn = document.querySelector('#add-list')

let reminderModal = document.querySelector('#reminder-modal')

let reminderModalCloseBtn = document.querySelector('#reminder-modal-close-btn')

let listModal = document.querySelector('#list-modal')

let listModalCloseBtn = document.querySelector('#list-modal-close-btn')

// EVENT LISTENERS

reminderList.addEventListener('click', toggleModal(reminders))

reminderModalCloseBtn.addEventListener('click', closeModal(reminderModal))

listModalCloseBtn.addEventListener('click', closeModal(listModal))

newReminderBtn.addEventListener('click', openModal(reminderModal))

addListBtn.addEventListener('click', openModal(listModal))

window.addEventListener('click', (e) => {

    let modal = e.target

    if(modal.id === "reminder-modal") {

        closeModal(reminderModal)()

    } else if(modal.id === 'list-modal') {

        closeModal(listModal)() //invokes the "inner" function
    }
})


