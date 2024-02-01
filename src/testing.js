import { publishReminder} from "./reminder"
export {testReminder}

function testReminder(obj) {

    document.querySelector('button#publishReminder').addEventListener('click', publishReminder(obj))

    let clickEvent = new Event('click')

    document.querySelector('#publishReminder').dispatchEvent(clickEvent)

    document.querySelector('#reminders').classList.add('visible')
}


