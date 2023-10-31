import './index.html'
import './colors.css'
import './classes.css'
import './header.css'
import './main.css'
import './footer.css'
import {openModal} from './modalControl'
import {addListToPage} from './list'
import {publishReminder,updateReminderCount} from './reminder.js'
import {reminderStorage} from './storage'

// let defaultList = document.querySelector('#defaultList')

let newReminderBtn = document.querySelector('#new-reminder')

let reminderModal = document.querySelector('#reminder-modal')

let reminderModalCloseBtn = document.querySelector('#reminder-modal-close-btn')

let listModal = document.querySelector('#list-modal')

let listModalCloseBtn = document.querySelector('#list-modal-close-btn')

document.querySelector('button#publishReminder').addEventListener('click', publishReminder) 

// EVENT LISTENERS

document.addEventListener('click', showDropDownList)

function showDropDownList(e) {

    if(e.target.classList.contains('banner')) {
        
        e.target.lastElementChild.classList.toggle('visible')
    }
}

document.addEventListener('click', deleteReminderHtml)

function deleteReminderHtml(e) {

    let closeBtn = e.target
    
    let reminder = closeBtn.parentElement

    if(closeBtn.classList.contains('close-btn')) {

        deleteReminderFromStorage(closeBtn.previousElementSibling.innerHTML) //matches html reminder's h4 to reminderTitle prop

        updateReminderCount(reminder.parentElement.id)

        reminder.remove()
    }
}

document.addEventListener('click', closeModal)

function closeModal(e) {

    if(e.target.classList.contains('modal')) {

         e.target.classList.remove('visible')
    }

    }

function deleteReminderFromStorage(name) {

    for(let i = 0; i < reminderStorage.length; i++) {

        if(name === reminderStorage[i].reminderTitle) {

            reminderStorage.splice(i, 1)
        }
    }

    console.log(reminderStorage)
}

newReminderBtn.addEventListener('click', openModal(reminderModal))

// reminderModalCloseBtn.addEventListener('click', closeModal(reminderModal))

document.querySelector('#list-modal').classList.add('visible')  //debug

openListModal.addEventListener('click', openModal(listModal))  //html id

// listModalCloseBtn.addEventListener('click', closeModal(listModal))

addList.addEventListener('click', addListToPage)

// TEST LIST
// addList.dispatchEvent(clickEvent)
// document.querySelector('button#publishReminder').dispatchEvent(clickEvent)