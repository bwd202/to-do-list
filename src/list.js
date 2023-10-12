export {listHtml}
import listIcon from './icons/calendar-text.svg'

class List {
    constructor({name = 'new list', color = '#000'}={}) {
        this.name = name
        this.color = color
    }
}

let listHtml = function() {

    let wrapper = new DocumentFragment()

    let icon = new Image(50,50)
    icon.src = listIcon

    let h3 = document.createElement('h3')

    let listName = document.querySelector("[placeholder='List name']").value

    let color = document.querySelector("[type='color']").value

    let count = document.createElement('p')

    let closeBtn = document.createElement('span')
    closeBtn.innerHTML = '&times;'

    h3.append(listName)

    wrapper.append(icon, h3, count, closeBtn)

    return wrapper
}

let addList = function() {

}