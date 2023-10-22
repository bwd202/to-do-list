export {listStorage}

let listStorage = {  //uses computed properties to store and get new list names

    addList(name) {

        this[name] = []
    },

    getList(name) {

        return this[name]
    }


}