export default addNewList
import listIcon from './icons/calendar-text.svg'
import CssFilterConverter from 'css-filter-converter'

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

    // console.log(color)

    return new List({name, color})
}

function listHtml(obj) {

    // let list = makeListObj()

    let wrapper = new DocumentFragment()

    // let listWrapper = document.createElement('div')
    
    // listWrapper.classList.add('list-wrapper')

    let listBanner = document.createElement('div')

    listBanner.classList.add('banner','button','border')

    let icon = new Image(50,50)

    icon.src = listIcon

    let iconColor = CssFilterConverter.hexToFilter(obj.color).color

    let p = document.createElement('p')

    let listName = obj.name

    icon.style.filter = iconColor

    // console.log(iconColor)

    p.append(listName)

    let count = document.createElement('span')

    count.innerHTML = 0

    let closeBtn = document.createElement('span')
    closeBtn.classList.add('close-btn-2')
    closeBtn.innerHTML = '&times;'
    closeBtn.addEventListener('click', () => listBanner.remove())

    let dropDown = document.createElement('div')

    dropDown.classList.add('drop-down')

    dropDown.setAttribute('id',obj.name)

    dropDown.setAttribute('hidden','')

    listBanner.append(icon, p, count, closeBtn, dropDown)

    // listWrapper.append(listBanner, listDropDown)

    wrapper.append(listBanner)

    return wrapper
}

function addListToReminderModalOptions(obj) {

    let container = document.querySelector('#selectList')

    let newListOption = document.createElement('option')

    newListOption.setAttribute('value', obj.name)

    newListOption.innerHTML = obj.name

    container.append(newListOption)

}

// adds id to reminder with list name obtained from list modal
function linkListNameToReminderHtml() {
    document.querySelector()
}

function addNewList() {

    let list = makeListObj()

    addListToReminderModalOptions(list)

    let article = document.querySelector('article')

    article.append(listHtml(list))
}