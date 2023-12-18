import './index.html'
import './styles/main.css'
import './styles/buttons.css'
import './styles/banner.css'
import './styles/card.css'
import './styles/forms.css'
import './styles/header.css'
import './styles/footer.css'
import './styles/reminder.css'
import './styles/modal.css'
import { publishReminder, deleteReminderHtml} from './reminder.js'
import { reminders } from './storage'
import { updateCounters } from './counters.js'
import { openModal, closeModal, showCompleted } from './modal'
import { expandCollapseBanner, appendBanner, crossOutHtml } from './banner.js'

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

document.querySelector('article').addEventListener('input', showCompleted)
