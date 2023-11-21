export {addListToPage,showDropDownList}
import listIcon from './icons/calendar-text.svg'
import CssFilterConverter from 'css-filter-converter'
import { listStorage } from './storage'

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
    listStorage.push(getListInputs())
}

function getListInputs() {   //creates obj from inputs and returns

    let obj = new List()

    obj.name = document.querySelector("[placeholder='List name']").value.trim()

    obj.listColor = document.querySelector("[type='color']").value

    return obj
}

function makeHtmlList(obj) {    //creates html list banner from obj

    let wrapper = new DocumentFragment()

    let listBanner = document.createElement('div')

    listBanner.classList.add('banner','button','border')

    let icon = new Image(50,50)

    icon.src = listIcon

    let iconColor = CssFilterConverter.hexToFilter(obj.listColor).color  //color is a prop of the obj returned by cssFilterConverter

    let p = document.createElement('p')

    let name = obj.name

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

    dropDown.setAttribute('id',obj.id)

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

    newListOption.setAttribute('value', obj.id)

    newListOption.innerHTML = obj.id

    container.append(newListOption)

}

function addListToPage(e) { //shows html list on the page

    e.preventDefault()

    storeList()

    let listObj = listStorage.at(-1)

    addNewListInputOption(listObj)

    let listHtml = makeHtmlList(listObj)

    let container = document.querySelector('article')

    container.append(listHtml)

    listForm.reset()
}

function showDropDownList(e) {

    if(e.target.classList.contains('banner')) {
        
        e.target.lastElementChild.classList.toggle('visible')
    }
}