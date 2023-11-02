export {openModal,closeModal}
import { reminderStorage } from "./storage"

function closeModal(e) {

    if(e.target.classList.contains('modal')) {

         e.target.classList.remove('visible')
    }

    else if (e.target.classList.contains('modal-close-btn')) {

        e.target.closest('.modal').classList.remove('visible')
    }

}

function openModal(e) {

    if(e.target.classList.contains('modal-btn')) {

        e.target.nextElementSibling.classList.add('visible')    //show modal

        publishModal(e)
    }

}

function publishModal(e) {

    let id = '#' + e.target.nextElementSibling.id

    switch(id) {

        case '#all':
            makeModalHtml(getAll(), id)
            break;

        case '#scheduled':
            console.log('scheduled')
            break;

        case '#today':
            console.log('today')
            break;

        case '#completed':
            console.log('completed')
            break;

        case '#reminder-modal':
            console.log('reminder-modal')
            break;

        case '#list-modal':
            console.log('list-modal')
            break;

        default:
            console.log('modal')
    }
}

function getAll() {
    return reminderStorage.slice()
}

function makeModalHtml(arr, idOfModal) {

        console.log(arr)

        let wrapper = document.createElement('div')

        wrapper.classList.add('wrapper')

        let closeBtn = document.createElement('span')

        closeBtn.classList.add('modal-close-btn')

        closeBtn.innerHTML = '&times;'

        let content = document.createElement('div')

        content.classList.add('content')

        wrapper.append(closeBtn,content)

        for(let i = 0; i < arr.length; i++) {

            let reminder = document.createElement('div')

            let checkbox = document.createElement('input')
            
            checkbox.setAttribute('type','checkbox')

            let title = document.createElement('h4')

            title.innerHTML = arr[i].title

            reminder.append(checkbox,title)

            content.append(reminder)
        }

        document.querySelector(idOfModal).append(wrapper)
}