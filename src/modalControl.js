export {closeModal, openModal}

function closeModal(modal) {//returns fn for eventHandler

    return function(e) {

        console.log(e)

        modal.classList.remove('visible')
    }
   
}

function openModal(modal) {

    return function() {
        modal.classList.add('visible')
    }

}