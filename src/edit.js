export {editReminder}

function editReminder(e) {

    if(e.target.classList.contains('reminder-short')) {

        document.querySelector('#edit-reminder').classList.toggle('visible')
    }
}