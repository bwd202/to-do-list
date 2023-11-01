import { reminderStorage } from "./storage";

let allCounter = document.querySelector('#all').closest('.counter')

allCounter.innerHTML = reminderStorage.length