import './index.html'
import './styles/colors.css'
import './styles/classes.css'
import './styles/header.css'
import './styles/main.css'
import './styles/footer.css'
import './styles/list.css'
import './styles/reminder.css'
import './styles/reminderModal.css'
import { addListToPage, showDropDownList } from './list'
import {
	publishReminder,
	deleteReminderHtml,
	showCompleted,
} from './reminder.js'
import { reminders } from './storage'
import { updateCounters } from './counters.js'
import { openModal, closeModal, updateModals } from './modal'
import { crossOutHtml } from './completed.js'

// EVENT LISTENERS

document
	.querySelector('button#publishReminder')
	.addEventListener('click', publishReminder)

document
	.querySelector('button#addList')
	.addEventListener('click', addListToPage)

document.addEventListener('click', showDropDownList)

document.addEventListener('click', deleteReminderHtml)

document.addEventListener('click', closeModal)

document.addEventListener('click', openModal)

document.addEventListener('click', crossOutHtml)
