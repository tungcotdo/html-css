import IndexClass from "./customIndex.js"

const classNamesMap = {
    IndexClass
};
  
function getUrl(controller, action){
    return 'i.html?c=' + controller + '&a=' + action;
}

function init( controller, action ){
    const c = new(classNamesMap['IndexClass'])();
    window.history.pushState({}, null, getUrl(controller, action));
}

init('IndexClass', 'show');
