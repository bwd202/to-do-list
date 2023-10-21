export {countReminders,addNewList}
import listIcon from './icons/calendar-text.svg'
import CssFilterConverter from 'css-filter-converter'
import { reminderStorage } from './reminder'

// UI

class List {
    constructor({name = 'new list', color = '#0f0'}={}) {
        this.name = name
        this.color = color
    }
}

function makeListObj() {

    let name = document.querySelector("[placeholder='List name']").value

    let color = document.querySelector("[type='color']").value

    return new List({name, color})
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

    count.innerHTML = countReminders()

    let closeBtn = document.createElement('span')
    closeBtn.classList.add('close-btn-2')
    closeBtn.innerHTML = '&times;'
    closeBtn.addEventListener('click', () => listBanner.remove())

    let dropDown = document.createElement('div')

    dropDown.classList.add('drop-down')

    dropDown.setAttribute('id',obj.name)

    dropDown.setAttribute('hidden','')

    listBanner.append(icon, p, count, closeBtn, dropDown)

    wrapper.append(listBanner)

    return wrapper
}

function countReminders() {
    
    let counter = document.querySelector('.counter')

    let reminderCount = counter.parentElement?.lastElementChild.children.length

    counter.innerHTML = reminderCount
}

function addListToReminderModalOptions(obj) {

    let container = document.querySelector('#selectList')

    let newListOption = document.createElement('option')

    newListOption.setAttribute('value', obj.name)

    newListOption.innerHTML = obj.name

    container.append(newListOption)

}

function addNewList() {

    let list = makeListObj()

    addListToReminderModalOptions(list)

    let article = document.querySelector('article')

    article.append(listHtml(list))
}