export {updateCounters}
import { reminders } from "./storage"

function updateCounters(listId) {
   
    let banner = document.querySelector(listId).parentElement

    let reminderCounter = banner.querySelector('.counter')

    reminderCounter.innerHTML = countReminders(list)

    // let allCounter = document.querySelector('#all').parentElement.children[2]    //BUG 

    // allCounter.innerHTML = reminderStorage.length
}

function countReminders(list) {

    let filtered = reminders.filter(item => item.reminderList === list)

    return filtered.length
}

// fn updateCounters

// filter reminders in storage based on list/category prop

// show filtered array length in respective counter innerHtml