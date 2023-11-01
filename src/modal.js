export {openModal,closeModal,modalHtml}
import { reminderStorage } from "./storage"

function openModal(e) {

    if(e.target.classList.contains('modal-open-btn')) {

        e.target.nextElementSibling.classList.add('visible')
    }

    // if(e.target.classList.contains('modal-btn')) {

    //     modalHtml()
    // }

}

function closeModal(e) {

    if(e.target.classList.contains('modal')) {

         e.target.classList.remove('visible')
    }

    else if (e.target.classList.contains('modal-close-btn')) {

        e.target.closest('.modal').classList.remove('visible')
    }

}

function modalHtml(e) {

    if(e.target.classList.contains('modal-btn')) {

        let modalContent = []

        let modal = document.createElement('div')

        modal.classList.add('modal')

        // modal.classList.add('visible')

        modal.setAttribute('hidden','')

        // modal.classList.add('visible')

        let wrapper = document.createElement('div')

        wrapper.classList.add('wrapper')

        let closeBtn = document.createElement('span')

        closeBtn.classList.add('modal-close-btn')

        closeBtn.innerHTML = '&times;'

        modalContent.push(closeBtn)

        wrapper.append(...modalContent)

        modal.append(wrapper)

        document.querySelector('main').append(modal)

    }

    
}