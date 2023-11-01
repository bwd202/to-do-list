import './index.html'
import './styles/colors.css'
import './styles/classes.css'
import './styles/header.css'
import './styles/main.css'
import './styles/footer.css'
import {addListToPage} from './list'
import {publishReminder} from './reminder.js'
import {reminderStorage} from './storage'
import {updateCounters } from './counters.js'
import { testReminder } from './testing'
import {openModal, closeModal} from './modal'

// TESTING

// testReminder()

// EVENT LISTENERS

document.querySelector('button#publishReminder').addEventListener('click', publishReminder())

document.querySelector('button#addList').addEventListener('click', addListToPage)

function showDropDownList(e) {

    if(e.target.classList.contains('banner')) {
        
        e.target.lastElementChild.classList.toggle('visible')
    }
}

document.addEventListener('click', showDropDownList)

function deleteReminderHtml(e) {

    let closeBtn = e.target
    
    let reminder = closeBtn.parentElement

    if(closeBtn.classList.contains('close-btn')) {

        deleteReminderFromStorage(closeBtn.previousElementSibling.innerHTML) //matches html reminder's h4 to reminderTitle prop

        updateCounters(reminder.parentElement.id)

        reminder.remove()
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

document.addEventListener('click', deleteReminderHtml)

document.addEventListener('click', closeModal)

document.addEventListener('click', openModal)