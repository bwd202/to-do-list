export {addListToPage}
import listIcon from './icons/calendar-text.svg'
import CssFilterConverter from 'css-filter-converter'
import { listStorage } from './storage'

class List {
    constructor({name = 'new list', color = '#0f0'}={}) {
        this.listName = name
        this.listColor = color
        // this.reminderStorage = []
    }

    // storeReminder(obj) {
    //     this.reminderStorage.push(obj)
    // }

    // get reminderCount() {
    //     return this.reminderStorage.length
    // }

}

function makeListObj() { 

    return new List(getListInputs())    //list obj
}

function getListInputs() {   

    let name = document.querySelector("[placeholder='List name']").value.trim()

    if (name === '') {name = 'New List'}

    let color = document.querySelector("[type='color']").value

    return {name,color} //object with strings
}

function processList() {

    let obj = makeListObj()

    listStorage.push(obj)

    // console.log(listStorage)
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

function addListToPage(e) { //shows html list on the page

    e.preventDefault()

    processList()

    let listObj = listStorage.at(-1)

    addNewListInputOption(listObj)

    let listHtml = makeHtmlList(listObj)

    let container = document.querySelector('article')

    container.append(listHtml)
}