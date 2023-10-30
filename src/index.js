import './index.html'
import './colors.css'
import './classes.css'
import './header.css'
import './main.css'
import './footer.css'
import { closeModal, openModal} from './modalControl'
import {addListToPage} from './list'
import {publishReminder} from './reminder.js'
import {reminderStorage} from './storage'

// let defaultList = document.querySelector('#defaultList')

let newReminderBtn = document.querySelector('#new-reminder')

let reminderModal = document.querySelector('#reminder-modal')

let reminderModalCloseBtn = document.querySelector('#reminder-modal-close-btn')

let listModal = document.querySelector('#list-modal')

let listModalCloseBtn = document.querySelector('#list-modal-close-btn')

document.querySelector('button#publishReminder').addEventListener('click', publishReminder) 

// DEFAULT REMINDER HTML

// function publishDefaultReminder() {

//     document.querySelector('#defaultList').classList.add('visible') //shows drop-down by default

//     let defaultReminder = new Reminder({title:'Take trash out',notes:"Notes"})

//     document.querySelector('button#publishReminder').addEventListener('click', publishReminder(defaultReminder))

//     let clickEvent = new Event('click')

//     document.querySelector('button#publishReminder').dispatchEvent(clickEvent)

// }   

// while (defaultList.children.length === 0) publishDefaultReminder()

// REMINDER MODAL

// document.querySelector('#reminder-modal').classList.add('visible')

document.addEventListener('click', function(e){

    if(e.target.classList.contains('banner')) {
        
        e.target.lastElementChild.classList.toggle('visible')
    }
  })

document.addEventListener('click', deleteReminderHtml)

function deleteReminderHtml(e) {

    if(e.target.classList.contains('close-btn')) {

        e.target.parentElement.remove()

        deleteReminderFromStorage(e.target.previousElementSibling.innerHTML)
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

reminderModalCloseBtn.addEventListener('click', closeModal(reminderModal))

// LIST MODAL

// document.querySelector('#list-modal').classList.add('visible')

openListModal.addEventListener('click', openModal(listModal))  //html id

listModalCloseBtn.addEventListener('click', closeModal(listModal))

addList.addEventListener('click', addListToPage)

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