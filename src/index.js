import './index.html'
import './styles/main.css'
import './styles/buttons.css'
import './styles/banner.css'
import './styles/card.css'
import './styles/forms.css'
import './styles/header.css'
import './styles/footer.css'
import './styles/reminder.css'
import { publishReminder, deleteReminderHtml} from './reminder.js'
import { openModal, closeModal} from './modal'
import { expandCollapseBanner, appendBanner, removeBanner } from './banner.js'
import {crossOutCompleted} from './checkCompleted.js'

// EVENT LISTENERS
let publishReminderBtn = document.querySelector('button#publishReminder')

publishReminderBtn.addEventListener('click', publishReminder)

let addListBtn = document.querySelector('button#addList')

addListBtn.addEventListener('click', appendBanner)

document.addEventListener('click', expandCollapseBanner)

document.addEventListener('click', deleteReminderHtml)

document.addEventListener('click', closeModal)

document.addEventListener('click', openModal)

// document.querySelector('article').addEventListener('input', showCompleted)

document.addEventListener('click', removeBanner)

document.addEventListener('click', crossOutCompleted)
