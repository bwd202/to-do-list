export default addList
import listIcon from './icons/calendar-text.svg'
import CssFilterConverter from 'css-filter-converter'

// UI

// let addListBtn = document.querySelector('')

class List {
    constructor({name = 'new list', color = '#0f0'}={}) {
        this.name = name
        this.color = color
    }
}

// fn that "populates" list object

function makeListObj() {

    let name = document.querySelector("[placeholder='List name']").value

    let color = document.querySelector("[type='color']").value

    // console.log(color)

    return new List({name, color})
}

function listHtml() {

    let list = makeListObj()

    let wrapper = new DocumentFragment()

    let listWrapper = document.createElement('div')
    
    listWrapper.classList.add('list-wrapper')

    let container = document.createElement('div')

    container.classList.add('banner','button','border')

    let icon = new Image(50,50)

    icon.src = listIcon

    let iconColor = CssFilterConverter.hexToFilter(list.color).color

    let p = document.createElement('p')

    let listName = list.name

    icon.style.filter = iconColor

    // console.log(iconColor)

    p.append(listName)

    let count = document.createElement('span')

    count.innerHTML = 0

    let closeBtn = document.createElement('span')
    closeBtn.classList.add('close-btn-2')
    closeBtn.innerHTML = '&times;'
    closeBtn.addEventListener('click', () => container.remove())

    container.append(icon, p, count, closeBtn)

    listWrapper.append(container)

    wrapper.append(listWrapper)

    return wrapper
}

function addList() {

    let article = document.querySelector('article')

    article.append(listHtml())
}

function addListNameToNewReminderModal() {
    
}

// funtion that adds newly created list name to list options in reminder modal