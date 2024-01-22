export {editReminder}

function makeReminderModal() {

    let modal = document.createElement('div')

    modal.classList.add('modal')

    // modal.setAttribute('hidden', true)

    let closeBtn = document.createElement('span')

    closeBtn.classList.add('button', 'modal-close-btn')

    let content = document.createElement('div')

    content.classList.add('modal-content')

    modal.append(closeBtn,content)

    return modal
}

function editReminder(e) {

    if(e.target.classList.contains('reminder-short')) {

        document.querySelector('body').append(makeReminderModal())
    }
}