import { reminderStorage } from "./storage"
import { publishReminder } from "./reminder"
export {testingSuite}

document.querySelector('button#publishReminder').addEventListener('click', publishReminder)

function testingSuite() {

    let clickEvent = new Event('click')

    document.querySelector('button#publishReminder').dispatchEvent(clickEvent)

    console.log(reminderStorage)
}



// document.querySelector('#list-modal').classList.add('visible')  

// addList.dispatchEvent(clickEvent)
