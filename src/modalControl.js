export {closeModal, openModal, toggleModal}

function closeModal(modal) {//returns fn for eventHandler

    return function() {

        modal.classList.remove('visible')
    }
   
}

function openModal(modal) {

    return function() {

        modal.classList.add('visible')
    }

}

function toggleModal(modal) {
    return function() {
        modal.classList.toggle('visible')
    }
}