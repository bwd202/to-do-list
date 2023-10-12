
class List {
    constructor({name = 'new list', color = '#000'}={}) {
        this.name = name
        this.color = color
    }
}

let listHtml = function() {
    let wrapper = new DocumentFragment()

    let h3 = document.createElement('h3')

    let count = document.createElement('p')

    let closeBtn = document.createElement('span')

    closeBtn.innerHTML = '&times;'

    return wrapper
}