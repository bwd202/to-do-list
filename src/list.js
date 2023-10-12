export default addList
import listIcon from './icons/calendar-text.svg'

// UI

// let addListBtn = document.querySelector('')

class List {
    constructor({name = 'new list', color = '#000'}={}) {
        this.name = name
        this.color = color
    }
}

let listHtml = function() {

    let wrapper = new DocumentFragment()

    let listWrapper = document.createElement('div')
    
    listWrapper.classList.add('list-wrapper')

    let container = document.createElement('div')

    container.classList.add('banner','button','border')

    let icon = new Image(50,50)
    icon.src = listIcon

    let h3 = document.createElement('h3')

    let listName = document.querySelector("[placeholder='List name']").value

    h3.append(listName)

    // let color = document.querySelector("[type='color']").value

    let count = document.createElement('span')

    count.innerHTML = 0

    // let closeBtn = document.createElement('span')
    // closeBtn.innerHTML = '&times;'

    container.append(icon, h3, count)

    listWrapper.append(container)

    wrapper.append(listWrapper)

    return wrapper
}

function addList() {

    let article = document.querySelector('article')

    article.append(listHtml())
}