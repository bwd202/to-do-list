import './index.html'
import './colors.css'
import './classes.css'
import './header.css'
import './main.css'
import './footer.css'
import { closeModal, openModal, toggleModal} from './modalControl'
import addListFn from './list'
import reminderFn from './reminder.js'

// UIs

// let defaultList = document.querySelector('div#reminder-list')

// let reminders = document.querySelector('#reminders')

let newReminderBtn = document.querySelector('#new-reminder')

let reminderModal = document.querySelector('#reminder-modal')

let reminderModalCloseBtn = document.querySelector('#reminder-modal-close-btn')

let listModal = document.querySelector('#list-modal')

let listModalCloseBtn = document.querySelector('#list-modal-close-btn')

// EVENT LISTENERS

// Reminder Object HTML (drop-down container)

// document.querySelector('#reminders').classList.add('visible')

document.querySelector('button#publishReminder').addEventListener('click', reminderFn)

let clickEvent = new Event('click')

document.querySelector('button#publishReminder').dispatchEvent(clickEvent)

// New Reminder Modal Controls

// document.querySelector('#reminder-modal').classList.add('visible')

document.addEventListener('click', function(e){
    if(e.target.classList.contains('banner')){
        e.target.nextElementSibling.classList.toggle('visible')
    }
  })

newReminderBtn.addEventListener('click', openModal(reminderModal))

reminderModalCloseBtn.addEventListener('click', closeModal(reminderModal))

// List Modal Controls

// document.querySelector('#list-modal').classList.add('visible')

openListModal.addEventListener('click', openModal(listModal))  //html id

listModalCloseBtn.addEventListener('click', closeModal(listModal))

addList.addEventListener('click', addListFn)

// testing
// addList.dispatchEvent(clickEvent)

// Window

window.addEventListener('click', (e) => {

    let modal = e.target

    if(modal.id === "reminder-modal") {

        closeModal(reminderModal)()

    } else if(modal.id === 'list-modal') {

        closeModal(listModal)() //invokes the "inner" function
    }
})