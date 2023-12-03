export {lists,reminders,markComplete}

let lists = []

let reminders = []

function markComplete(item) {
	// switches reminderCompleted prop based on item checked

	for (let i = 0; i < reminders.length; i++) {
		if (!reminders[i].reminderCompleted) {
			if (reminders[i].reminderTitle === item) {
				reminders[i].reminderCompleted = true
			}
		} else if (reminders[i].reminderCompleted) {
			if (reminders[i].reminderTitle === item) {
				reminders[i].reminderCompleted = false

				purgeCompleted(reminders[i].reminderTitle)
			}
		}
	}

	// console.log(reminders);
}

// function purgeCompleted(reminder) {
    // 	for (let i = 0; i < completed.length; i++) {
    // 		if (completed.reminderTitle === reminder) {
    // 			completed.splice(i, 1)
    // 		}
    // 	}
    // }