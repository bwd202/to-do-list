import './index.html'
import './styles/colors.css'
import './styles/classes.css'
import './styles/header.css'
import './styles/main.css'
import './styles/footer.css'
import {addListToPage,showDropDownList} from './list'
import {publishReminder,deleteReminderHtml} from './reminder.js'
import {reminderStorage} from './storage'
import {updateCounters } from './counters.js'
import { testReminder } from './testing'
import {openModal, closeModal} from './modal'

// TESTING

// testReminder()

// EVENT LISTENERS

document.querySelector('button#publishReminder').addEventListener('click', publishReminder())

document.querySelector('button#addList').addEventListener('click', addListToPage)

document.addEventListener('click', showDropDownList)

document.addEventListener('click', deleteReminderHtml)

document.addEventListener('click', closeModal)

document.addEventListener('click', openModal)