export {closeModal}

function closeModal(modal) {

    return function(e) {
        // modal.classlist.remove('visible')
        modal.classlist.remove('visible')
    }
   
}