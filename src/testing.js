import { reminderStorage } from "./storage"
import { publishReminder, Reminder } from "./reminder"
export {testReminder}

function testReminder() {

    publishReminder(1)  //disables event listener

    let reminder = new Reminder()

    reminderStorage.push(reminder)

    let clickEvent = new Event('click')

    document.querySelector('button#publishReminder').dispatchEvent(clickEvent)

    console.log(reminderStorage)
}

document.querySelector('button#publishReminder').addEventListener('click', publishReminder)

// document.querySelector('#list-modal').classList.add('visible')  

// addList.dispatchEvent(clickEvent)
