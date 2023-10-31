import './index.html'
import './colors.css'
import './classes.css'
import './header.css'
import './main.css'
import './footer.css'
import {addListToPage} from './list'
import {publishReminder,updateCounters} from './reminder.js'
import {reminderStorage} from './storage'

// EVENT LISTENERS

document.querySelector('button#publishReminder').addEventListener('click', publishReminder)

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

document.addEventListener('click', deleteReminderHtml)

function closeModal(e) {

    if(e.target.classList.contains('modal')) {

         e.target.classList.remove('visible')
    }

    else if (e.target.classList.contains('modal-close-btn')) {

        e.target.closest('.modal').classList.remove('visible')
    }

}

document.addEventListener('click', closeModal)

function openModal(e) {

    if(e.target.classList.contains('modal-open-btn')) {

        e.target.nextElementSibling.classList.add('visible')
    }
}

document.addEventListener('click', openModal)

function deleteReminderFromStorage(name) {

    for(let i = 0; i < reminderStorage.length; i++) {

        if(name === reminderStorage[i].reminderTitle) {

            reminderStorage.splice(i, 1)
        }
    }

    console.log(reminderStorage)
}

// TESTING

// addList.dispatchEvent(clickEvent)
// document.querySelector('button#publishReminder').dispatchEvent(clickEvent)
// document.querySelector('#list-modal').classList.add('visible')  
