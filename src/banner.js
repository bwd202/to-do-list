import {Icon} from "./icon"
import {storeList} from './list'
import { lists, markComplete } from "./storage"
import chevronDown from './icons/chevron-down-solid.svg'
import chevronUp from './icons/chevron-up-solid.svg'
import bannerIcon from './icons/calendar-text.svg'
export {expandCollapseBanner,appendBanner,appendChevronIcon,crossOutHtml, removeBanner}

function makeBanner(obj) {    //creates html representation of list

    let wrapper = new DocumentFragment()

    let banner = document.createElement('div')

    banner.classList.add('banner','button','border','shadow')

    let icon = new Icon(bannerIcon, obj.listColor)

    let listIcon = icon.make('list')

    let listName = document.createElement('p')
    
    listName.append(obj.name)

    let count = document.createElement('span')

    count.classList.add('counter')

    let chevron = document.createElement('span')

    chevron.classList.add('chevron')

    let closeBtn = document.createElement('span')
    closeBtn.classList.add('banner-close-btn')
    closeBtn.innerHTML = '&times;'

    let dropDown = document.createElement('div')

    dropDown.classList.add('drop-down')

    dropDown.setAttribute('id',obj.id)

    dropDown.setAttribute('hidden','')

    banner.append(listIcon, listName, count, chevron, closeBtn, dropDown)

    wrapper.append(banner)

    return wrapper
}

function appendChevronIcon(container) {

    let chevronIcon = new Icon(chevronUp,'#d3d3d3')

    let chevronIcon1 = chevronIcon.make('chevron')

    container.append(chevronIcon1)

}

function removeBanner(e) { //'deletes' list banner

    if(e.target.classList.contains('banner-close-btn')) {

        let banner = e.target.parentElement

        banner.remove()

        let name = banner.lastElementChild.id

        removeListName(name)
    }
}

function removeListName(string) {   //removes name from options in reminder form's select input elem

    let options = document.querySelector('#list').children

    for(let i = 0; i < options.length; i++) {

        if(options[i].value === string) {

            options[i].remove()
        }
    }
}

function addNewListOption(obj) {   //adds new input to reminder modal form

    let container = document.querySelector('[name="listOptions"]')

    let newListOption = document.createElement('option')

    newListOption.setAttribute('value', obj.id)

    newListOption.innerHTML = obj.id

    container.append(newListOption)

}

function appendBanner(e) { //adds new banner to document

    // e.preventDefault()

    storeList()

    let listObj = lists.at(-1)

    addNewListOption(listObj)

    let newBanner = makeBanner(listObj)

    let container = document.querySelector('article')

    container.append(newBanner)

    listForm.reset()
}

function expandCollapseBanner(e) {

    if(e.target.classList.contains('banner')) {

        let chevronSpan = e.target.children[3]

        if(e.target.lastElementChild.classList.contains('visible')) {

            e.target.lastElementChild.classList.remove('visible')

            if(chevronSpan.firstElementChild) {
                
                chevronSpan.firstElementChild.remove()

                chevronSpan.append(flipChevron('down'))
            }

        }
        
        else {

            e.target.lastElementChild.classList.add('visible')

            if(chevronSpan.firstElementChild) { 

                chevronSpan.firstElementChild.remove()

                chevronSpan.append(flipChevron('up'))

            }
        }
    }
}

function flipChevron(direction) {

    switch(direction) {

        case 'down':
            let chevronIcon1 = new Icon(chevronDown,'#d3d3d3')
            let icon1 = chevronIcon1.make('chevron')
            return icon1

        case 'up':
            let chevronIcon2 = new Icon(chevronUp,'#d3d3d3')
            let icon2 = chevronIcon2.make('chevron')
            return icon2
    }
}

function crossOutHtml(e) {

	if (e.target.type === 'checkbox') {

		e.target.nextElementSibling.classList.toggle('completed')

		let reminder = e.target.nextElementSibling.children[0].innerHTML

		markComplete(reminder)
	}
}