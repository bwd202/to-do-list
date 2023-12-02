import CssFilterConverter from 'css-filter-converter'
export {Icon}

class Icon {

    constructor(src, color) {

        this._src = src
        this._color = color
    }

    make(type) {

        switch(type) {
            
            case 'list':
                let icon = new Image(50,50)
                icon.src = this._src
                icon.style.filter = CssFilterConverter.hexToFilter(this._color).color
                return icon

            case 'chevron':
                let icon2 = new Image(15,15)
                icon2.src = this._src
                icon2.style.filter = CssFilterConverter.hexToFilter(this._color).color
                return icon2
        }

        
    }
}