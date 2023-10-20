import './index.html'
import './colors.css'
import './classes.css'
import './header.css'
import './main.css'
import './footer.css'
import { closeModal, openModal, toggleModal} from './modalControl'
import addListFn from './list'
import {Reminder, publishReminder} from './reminder.js'

// UIs

// let defaultList = document.querySelector('div#reminder-list')

// let reminders = document.querySelector('#reminders')

let newReminderBtn = document.querySelector('#new-reminder')

let reminderModal = document.querySelector('#reminder-modal')

let reminderModalCloseBtn = document.querySelector('#reminder-modal-close-btn')

let listModal = document.querySelector('#list-modal')

let listModalCloseBtn = document.querySelector('#list-modal-close-btn')

// DEFAULT REMINDER HTML

document.querySelector('#defaultList').classList.add('visible') //shows drop-down by default

let defaultReminder = new Reminder({title:'Take trash out',notes:"Notes"})

document.querySelector('button#publishReminder').addEventListener('click', publishReminder(defaultReminder)) //shows an example of a reminder

let clickEvent = new Event('click')

document.querySelector('button#publishReminder').dispatchEvent(clickEvent)

// REMINDER MODAL

// document.querySelector('#reminder-modal').classList.add('visible')

document.addEventListener('click', function(e){

    if(e.target.classList.contains('banner')) {
        
        e.target.lastElementChild.classList.toggle('visible')
    }
  })

newReminderBtn.addEventListener('click', openModal(reminderModal))

reminderModalCloseBtn.addEventListener('click', closeModal(reminderModal))

// LIST MODAL

// document.querySelector('#list-modal').classList.add('visible')

openListModal.addEventListener('click', openModal(listModal))  //html id

listModalCloseBtn.addEventListener('click', closeModal(listModal))

addList.addEventListener('click', addListFn)

// TEST LIST
// addList.dispatchEvent(clickEvent)
// document.querySelector('button#publishReminder').dispatchEvent(clickEvent)

window.addEventListener('click', (e) => {  //closes either modal when user clicks anywhere outside modal

    let modal = e.target

    if(modal.id === "reminder-modal") {

        closeModal(reminderModal)()

    } else if(modal.id === 'list-modal') {

        closeModal(listModal)() //invokes the "inner" function
    }
})