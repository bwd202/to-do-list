import CssFilterConverter from 'css-filter-converter'
import chevronUp from './icons/chevron-up-solid.svg'
import chevronDown from './icons/chevron-down-solid.svg'
import listIcon1 from './icons/calendar-text.svg'
export {chevronDown1, chevronUp1, listIcon}

// chevron
let chevronDown1 = new Image(15,15)

chevronDown1.src = chevronDown

let chevronUp1 = new Image(15,15)

chevronUp1.src = chevronUp

// banner
class listIcon {

    constructor({color = '#0f0'}={}) {

        this._src = listIcon1
        this._color = color
    }

    get color() {

        return this._color
    }

    set color(name) {

        this._color = CssFilterConverter.hexToFilter(name).color
    }

    make() {

        let icon = new Image(50,50)

        icon.src = this._src

        icon.style.filter = this._color

        return icon
    }
}