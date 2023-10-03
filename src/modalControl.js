export {closeModal}

function closeModal(modal) {//returns fn for eventHandler

    return function(e) {

        console.log(e)

        // if(e.target.id === "reminder-modal" || e.target.id === "list-modal" ) {
        //  closeModal()
        // }

        modal.classList.remove('visible')
    }
   
}