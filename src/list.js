import { lists } from './storage'
import {Icon} from './icon'
import chevronDown from './icons/chevron-down-solid.svg'
import listIcon from './icons/calendar-text.svg'
export {addListToPage}


class List {
    constructor({name = 'New List', color = '#0f0'}={}) {
        // this.listName = name
        this._name = name
        this.listColor = color
    }

    get name() {
        return this._name
    }

    set name(str) {

       if (str === '') this._name = 'New List'

       else this._name = str
       
    }

    get id() {
        return this.sanitize(this.name)
    }

    // creates camelCase id
    sanitize(str) {

        let splitStr = str.split(' ')   //returns an array

        let modifyWords = splitStr.map((word, index) => index == 0 ? word : word[0].toUpperCase() + word.slice(1))

        let newString = modifyWords.join('')

        return newString
    }

}

function storeList() {
    lists.push(getListInputs())
}

function getListInputs() {   //creates obj from inputs and returns it

    let obj = new List()

    obj.name = document.querySelector("[placeholder='List name']").value.trim()

    obj.listColor = document.querySelector("[type='color']").value

    return obj
}

function makeHtmlList(obj) {    //creates html list banner from obj

    let wrapper = new DocumentFragment()

    let listBanner = document.createElement('div')

    listBanner.classList.add('banner','button','border')

    let icon = new Icon(listIcon, obj.listColor)

    // icon.color = obj.listColor

    let icon1 = icon.make('list')

    let p = document.createElement('p')

    let name = obj.name

    p.append(name)

    let count = document.createElement('span')

    count.classList.add('counter')

    let chevron = document.createElement('span')

    chevron.classList.add('chevron')

    let chevronIcon = new Icon(chevronDown,'d3d3d3')

    let chevronIcon1 = chevronIcon.make('chevron')

    chevron.append(chevronIcon1)

    let closeBtn = document.createElement('span')
    closeBtn.classList.add('banner-close-btn')
    closeBtn.innerHTML = '&times;'
    closeBtn.addEventListener('click', removeHtmlList)

    let dropDown = document.createElement('div')

    dropDown.classList.add('drop-down')

    dropDown.setAttribute('id',obj.id)

    dropDown.setAttribute('hidden','')

    listBanner.append(icon1, p, count, chevron, closeBtn, dropDown)

    wrapper.append(listBanner)

    return wrapper
}

function removeHtmlList(e) { //deletes html list banner

    let targetBanner = e.target.parentElement

    targetBanner.remove()

    let listId = targetBanner.lastElementChild.id

    removeListOption(listId)
}

function removeListOption(name) {   //removes list name from reminder modal

    let reminderModalListOptions = document.querySelector('#selectList').children

    for(let i = 0; i < reminderModalListOptions.length; i++) {

        if(reminderModalListOptions[i].value === name) {

            reminderModalListOptions[i].remove()
        }
    }
}

function addNewListInputOption(obj) {   //adds new list input option to reminder modal form

    let container = document.querySelector('[name="listOptions"]')

    let newListOption = document.createElement('option')

    newListOption.setAttribute('value', obj.id)

    newListOption.innerHTML = obj.id

    container.append(newListOption)

}

function addListToPage(e) { //shows html list on the page

    e.preventDefault()

    storeList()

    let listObj = lists.at(-1)

    addNewListInputOption(listObj)

    let listHtml = makeHtmlList(listObj)

    let container = document.querySelector('article')

    container.append(listHtml)

    listForm.reset()
}