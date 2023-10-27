export {addListToPage,updateReminderCount}
import listIcon from './icons/calendar-text.svg'
import CssFilterConverter from 'css-filter-converter'
import { listStorage } from './listStorage'

// UI

class List {
    constructor({name = 'new list', color = '#0f0'}={}) {
        this.listName = name
        this.listColor = color
        this.reminderStorage = []
    }

    storeReminder(obj) {
        this.reminderStorage.push(obj)
    }

    get reminderCount() {
        return this.reminderStorage.length
    }

}

function storeList(obj) {   

    listStorage.addList(obj)
}

function makeListObj(name,color) {

    return new List({name,color})
}

function getListInputs() {    //creates obj from list modal inputs, stores and returns

    let name = document.querySelector("[placeholder='List name']").value

    let color = document.querySelector("[type='color']").value

    return {name,color}
}

function processList() {

    let inputs = getListInputs()

    let listObj = makeListObj(inputs)

    storeList(listObj)
}

function makeHtmlList(obj) {    //creates html list banner from obj

    let wrapper = new DocumentFragment()

    let listBanner = document.createElement('div')

    listBanner.classList.add('banner','button','border')

    let icon = new Image(50,50)

    icon.src = listIcon

    let iconColor = CssFilterConverter.hexToFilter(obj.listColor).color  //color is a prop of the obj returned by cssFilterConverter

    let p = document.createElement('p')

    let name = obj.listName

    icon.style.filter = iconColor

    p.append(name)

    let count = document.createElement('span')

    count.classList.add('counter')

    // count.innerHTML = 0  //replace by generated thing

    let closeBtn = document.createElement('span')
    closeBtn.classList.add('banner-close-btn')
    closeBtn.innerHTML = '&times;'
    closeBtn.addEventListener('click', removeHtmlList)

    let dropDown = document.createElement('div')

    dropDown.classList.add('drop-down')

    dropDown.setAttribute('id',obj.listName)

    dropDown.setAttribute('hidden','')

    listBanner.append(icon, p, count, closeBtn, dropDown)

    wrapper.append(listBanner)

    return wrapper
}

function removeHtmlList(e) { //deletes html list banner from document and its respective list input option from reminder modal

    let targetBanner = e.target.parentElement

    targetBanner.remove()

    let listId = targetBanner.lastElementChild.id

    let reminderModalListOptions = document.querySelector('#selectList').children

    for(let i = 0; i < reminderModalListOptions.length; i++) {

        if(reminderModalListOptions[i].value === listId) {

            reminderModalListOptions[i].remove()
        }
    }
}

function addNewListInputOption(obj) {   //adds new list input option to reminder modal form

    let container = document.querySelector('#selectList')

    let newListOption = document.createElement('option')

    newListOption.setAttribute('value', obj.listName)

    newListOption.innerHTML = obj.listName

    container.append(newListOption)

}

function addListToPage() { //shows html list on the page

    // let list = makeListObj()

    // addNewListInputOption(list)

    let listObj = listStorage.getListObj(listStorage.lists.at(-1).name) //could have also gotten obj directly from array

    let listHtml = makeHtmlList(listObj)

    let container = document.querySelector('article')

    container.append(listHtml)
}

function updateReminderCount(list) {

    // let banner = 

    // list.querySelector('.counter').innerHTML = list.reminderCount
    
}