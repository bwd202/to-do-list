import { publishReminder} from "./reminder"
export {testReminder}

function testReminder() {

    document.querySelector('button#publishReminder').addEventListener('click', publishReminder(1))

    let clickEvent = new Event('click')

    document.querySelector('#publishReminder').dispatchEvent(clickEvent)
}

// document.querySelector('#list-modal').classList.add('visible')  

// addList.dispatchEvent(clickEvent)
