export {openModal,closeModal,modalHtml}
import { reminderStorage } from "./storage"

function openModal(e) {

    if(e.target.classList.contains('modal-open-btn')) {

        e.target.nextElementSibling.classList.add('visible')
    }

    if(e.target.classList.contains('modal-btn')) {

        e.target.nextElementSibling.classList.add('visible')    //show modal

        modalHtml()
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