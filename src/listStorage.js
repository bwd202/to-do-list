export {listStorage}

let listStorage = {  

    addList(obj) {

        this[obj.name] = obj    //stores list obj by obj name
    },

    getList(obj) {

        return this[obj.name]
    }


}