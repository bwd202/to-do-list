export {updateCounters}
import { allReminders } from "./storage"

function updateCounters(list) {
   
    let banner = document.querySelector('#' + list).parentElement

    let reminderCounter = banner.querySelector('.counter')

    reminderCounter.innerHTML = countReminders(list)

    // let allCounter = document.querySelector('#all').parentElement.children[2]    //BUG 

    // allCounter.innerHTML = reminderStorage.length
}

function countReminders(list) {

    let filtered = allReminders.filter(item => item.reminderList === list)

    return filtered.length
}