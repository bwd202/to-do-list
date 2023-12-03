import './index.html'
import './styles/colors.css'
import './styles/classes.css'
import './styles/header.css'
import './styles/main.css'
import './styles/footer.css'
import './styles/banner.css'
import './styles/reminder.css'
import './styles/reminderModal.css'
import { publishReminder, deleteReminderHtml, showCompleted } from './reminder.js'
import { reminders } from './storage'
import { updateCounters } from './counters.js'
import { openModal, closeModal, updateModals } from './modal'
import { crossOutHtml } from './completed.js'
import { expandCollapseBanner, appendBanner } from './banner.js'

// EVENT LISTENERS
let publishReminderBtn = document.querySelector('button#publishReminder')

publishReminderBtn.addEventListener('click', publishReminder)

let addListBtn = document.querySelector('button#addList')

addListBtn.addEventListener('click', appendBanner)

document.addEventListener('click', expandCollapseBanner)

document.addEventListener('click', deleteReminderHtml)

document.addEventListener('click', closeModal)

document.addEventListener('click', openModal)

document.addEventListener('click', crossOutHtml)
