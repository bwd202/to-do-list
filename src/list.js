import { lists } from './storage'
export {storeList}

class List {
    constructor({name = 'New List', color = '#0f0'}={}) {
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
        return this.camelCase(this.name)
    }

    // for ID
    camelCase(str) {

        let splitted = str.split(' ')   //array

        let camelized = splitted.map((word, index) => index == 0 ? word : word[0].toUpperCase() + word.slice(1))

        let newStr = camelized.join('')

        return newStr
    }

}

function storeList() {

    lists.push(getListInputs())
}

function getListInputs() {   //creates obj from list modal inputs, returns obj

    let obj = new List()

    obj.name = document.querySelector("[placeholder='List name']").value.trim()

    obj.listColor = document.querySelector("[type='color']").value

    return obj
}