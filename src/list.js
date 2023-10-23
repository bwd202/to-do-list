export {addNewList,updateReminderCount}
import listIcon from './icons/calendar-text.svg'
import CssFilterConverter from 'css-filter-converter'
import { listStorage } from './listStorage'

// UI

class List {
    constructor({name = 'new list', color = '#0f0'}={}) {
        this.name = name
        this.color = color
        this.storage = []
    }

    storeReminder(rem) {
        this.storage.push(rem)
    }

    get name() {
        return this.name
    }

    // get storage() {
    //     return this._storage
    // }
}

function makeListObj() {

    let name = document.querySelector("[placeholder='List name']").value

    let color = document.querySelector("[type='color']").value

    let newList = new List({name, color})

    listStorage.addList(newList)

    return newList
}

function listHtml(obj) {

    let wrapper = new DocumentFragment()

    let listBanner = document.createElement('div')

    listBanner.classList.add('banner','button','border')

    let icon = new Image(50,50)

    icon.src = listIcon

    let iconColor = CssFilterConverter.hexToFilter(obj.color).color

    let p = document.createElement('p')

    let listName = obj.name

    icon.style.filter = iconColor

    p.append(listName)

    let count = document.createElement('span')

    count.classList.add('counter')

    count.innerHTML = 0

    let closeBtn = document.createElement('span')
    closeBtn.classList.add('banner-close-btn')
    closeBtn.innerHTML = '&times;'
    closeBtn.addEventListener('click',removeList)

    let dropDown = document.createElement('div')

    dropDown.classList.add('drop-down')

    dropDown.setAttribute('id',obj.name)  //LIST NAME

    dropDown.setAttribute('hidden','')

    listBanner.append(icon, p, count, closeBtn, dropDown)

    wrapper.append(listBanner)

    return wrapper
}

function removeListBanner(e) { //rms list from document

    let targetBanner = e.target.parentElement

    targetBanner.remove()

    let reminderModalListOptions = document.querySelector('#selectList')

    // reminderModalListOptions

}

function removeListName(e) { //rms list name from reminder modal options

    // let targetListId = e.target.nextSibling.id

    // container.lastChild.remove()

    // console.log(container.querySelector('#' + targetListId))

    console.log(e.target)
}

function addListToReminderModalOptions(list) {

    let container = document.querySelector('#selectList')

    let newListOption = document.createElement('option')

    newListOption.setAttribute('value', list.name)

    newListOption.innerHTML = list.name

    container.append(newListOption)

}

function addNewList() {

    let list = makeListObj()

    addListToReminderModalOptions(list)

    let article = document.querySelector('article')

    article.append(listHtml(list))
}

function updateReminderCount(elem, count) {
    
    elem.children[2].innerHTML = count.length
}