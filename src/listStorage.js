export {listStorage}

let listStorage = {  

    addList(obj) {

        this[obj.listName] = obj    //stores list obj by obj name
    },

    getList(obj) {

        return this[obj.listName]
    }


}