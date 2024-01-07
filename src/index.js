import './index.html'
import './styles/main.css'
import './styles/buttons.css'
import './styles/banner.css'
import './styles/card.css'
import './styles/forms.css'
import './styles/header.css'
import './styles/footer.css'
import './styles/reminder.css'
import { publishReminder} from './reminder.js'
import { openModal, closeModal} from './modal'
import { expandCollapseBanner, appendBanner, removeBanner } from './banner.js'
import {crossOutCompleted} from './checkCompleted.js'
import { deleteReminderHtml } from './delete.js'
import { testReminder } from './testing.js'

testReminder()

// EVENT LISTENERS
let publishReminderBtn = document.querySelector('button#publishReminder')

// publishReminderBtn.addEventListener('click', publishReminder())

let addListBtn = document.querySelector('button#addList')

addListBtn.addEventListener('click', appendBanner)

document.addEventListener('click', expandCollapseBanner)

document.addEventListener('click', deleteReminderHtml)

document.addEventListener('click', closeModal)

document.addEventListener('click', openModal)

document.addEventListener('click', removeBanner)

document.addEventListener('click', crossOutCompleted)
