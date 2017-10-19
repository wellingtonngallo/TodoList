import {isEnabled} from './lib/feature';
import React from 'react';
import ReactDOM from 'react-dom';



export function render(el, state) {
    var todoItems = [];
    if(state.todos){
        todoItems = Array.prototype.map.call(state.todos, renderTodoItem).join('');
    }
    
    /*const todosDone = state.todos.filter(item => item.done);
    todoItems = Array.prototype.map.call(todosDone, renderTodoItem).join('');
    
    const todosNotDone = state.todos.filter(item => !item.done);
    todoItems = Array.prototype.map.call(todosNotDone, renderTodoItem).join('');*/
    
    el.innerHTML = renderApp(
        renderInput(),
        renderTodos(todoItems),
    );
}

function renderApp(input, todoList) {
    if(isEnabled('renderBottom')) {
        return renderAddTodoAtBottom(input, todoList);
    }else{
        return renderAddTodoAtTop(input, todoList);
    }
}

function renderAddTodoAtTop(input, todoList) {
    return `<div id="app">
                <h1>ToDo List</h1>
                ${input}
                ${todoList}
            </div>`;
}

function renderAddTodoAtBottom(input, todoList) {
    return `<div id="app">
        ${todoList}
        ${input}
    </div>`;
}

function renderInput() {
    return `<form action="#" id="formList" class="form-inline">
                <div class="input-group input-group-sm">
                    <input type="text" id="todoInput" class="form-control" />
                    <span class="input-group-btn">
                        <button id="addTodo" class="btn btn-primary">Add</button>
                    </span>
                </div>
            </form>`;
}

function renderTodos(todoItems) {
    
    return `<ul class="list-group">${todoItems}</ul>`;
}

function renderTodoItem(todo) {

    const todoClass = `todo__item todo__item--${todo.done ? 'done' : 'open'}`;
    return `<li class="${todoClass} list-group-item">
        <input class="js_toggle_todo" type="checkbox" data-id="${todo.id}"${todo.done ? ' checked' : ''} />
        ${todo.text}
    </li>`;
}
