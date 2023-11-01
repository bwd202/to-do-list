export {updateCounters}
import { reminderStorage } from "./storage"

function updateCounters(list) {
   
    let banner = document.querySelector('#' + list).parentElement

    let reminderCounter = banner.querySelector('.counter')

    reminderCounter.innerHTML = countReminders(list)

    let allCounter = document.querySelector('#all').closest('.counter')

    allCounter.innerHTML = reminderStorage.length
}

function countReminders(list) {

    let filtered = reminderStorage.filter(item => item.reminderList === list)

    return filtered.length
}