import {createStore} from './lib/state';

var storage = JSON.parse(localStorage.getItem('state'));

if(storage == null){
    var initialState = {
        todos: []
    };
}else{
    var initialState = {
        todos: Object.keys(storage).length !== 0 ? storage : []
    };
}

function todoChangeHandler(state, change) {
    switch(change.type) {
        case 'ADD_TODO':    
            state.todos.push({
                id: state.todos.length,
                text: change.text,
                done: false
            });

            localStorage.setItem("state", JSON.stringify(state.todos));
            break;
        case 'TODO_TOGGLE_DONE':
            state.todos = state.todos.map(item => {
                if(item.id === change.id){
                    item.done = !item.done;
                }
                return item;
            })

            localStorage.setItem("state", JSON.stringify(state.todos));

            break;
    }
}

export const todos = createStore(todoChangeHandler, initialState);