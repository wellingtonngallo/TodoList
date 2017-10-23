import {todos} from './state';
import {listen, setStorage, setUrl} from './lib/events';
import {addTodo, toggleTodoState} from './actions';

export function registerEventHandlers() {
    
    listen('submit', '#formList', event => {

        event.preventDefault();

        const todoInput = document.getElementById('todoInput').value;

        if(todoInput != ""){
            todos.dispatch(addTodo(todoInput));
            document.getElementById('todoInput').focus();
            
            event.stopPropagation();
        }
    });

    listen('change', '#filter', event => {

        var filter = document.getElementById('filter').value;
        setStorage(filter);
        setUrl("");
    });

    listen('change', '#filterNotDone', event => {

        var filter = document.getElementById('filterNotDone').value;
        setStorage(filter);
        setUrl("#filterNotDone");
    });

    listen('change', '#filterDone', event => {

        var filter = document.getElementById('filterDone').value;
        setStorage(filter);
        setUrl("#filterDone");
    });


    listen('click', '.js_toggle_todo', event => {
        
        const id = Number.parseInt(event.target.getAttribute('data-id'), 10);
        todos.dispatch(toggleTodoState(id));
    });
}