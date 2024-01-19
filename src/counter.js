export {updateCounter}

function updateCounter(banner) {

    let dropDown = banner.lastElementChild
   
    banner.querySelector('.counter').innerHTML = dropDown.children.length
    
}