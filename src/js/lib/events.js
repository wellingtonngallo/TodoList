export function listen(eventName, selector, handler) {
    document.body.addEventListener(eventName, event => {
        if(event.target.matches(selector)) {
            return handler(event);
        }
    });
}

export function setStorage(typeFilter){
    localStorage.setItem("checked", typeFilter);
}

export function setUrl(url){
    parent.location.hash = url;
    location.reload(); 
}