export {openModal,closeModal,modalHtml}
import { reminderStorage } from "./storage"

function openModal(e) {

    if(e.target.classList.contains('modal-btn')) {

        e.target.nextElementSibling.classList.add('visible')    //show modal

        showModal(e)
    }

}

function showModal(e) {

    let targetModal = e.target.nextElementSibling.id

    switch(targetModal) {
        case 'all':
            console.log('all')
            break;
        case 'scheduled':
            console.log('scheduled')
            break;
        case 'today':
            console.log('today')
            break;
        case 'completed':
            console.log('completed')
            break;
        case 'reminder-modal':
            console.log('reminder-modal')
            break;
        case 'list-modal':
            console.log('list-modal')
            break;
        default:
            console.log('modal')
    }
}

function closeModal(e) {

    if(e.target.classList.contains('modal')) {

         e.target.classList.remove('visible')
    }

    else if (e.target.classList.contains('modal-close-btn')) {

        e.target.closest('.modal').classList.remove('visible')
    }

}

function modalHtml() {

    return function() {

        let wrapper = document.createElement('div')

        wrapper.classList.add('wrapper')

        let modalContent = []

        let closeBtn = document.createElement('span')

        closeBtn.classList.add('modal-close-btn')

        closeBtn.innerHTML = '&times;'

        let list = document.createElement('div')

        let reminder = document.createElement('div')

        let checkbox = document.createElement('input')
        
        checkbox.setAttribute('type','checkbox')

        let title = document.createElement('h4')

        title.innerHTML = 'test reminder'

        reminder.append(checkbox,title)

        list.append(reminder)

        modalContent.push(closeBtn,list)

        wrapper.append(...modalContent)

        document.querySelector('.modal').append(wrapper)
    }

}