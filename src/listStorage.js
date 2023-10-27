export {listStorage}

let listStorage = {
    
    lists: [],

    addList(obj) {

        lists.push(obj)    //stores list obj by obj name
    },

    getListObj(name) {  //returns list obj by name string

        return lists.find(item => item.name == name)  
    }


}