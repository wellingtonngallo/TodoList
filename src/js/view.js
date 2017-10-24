import {isEnabled} from './lib/feature';
import React from 'react';
import ReactDOM from 'react-dom';

export function render(el, state) {
    var todoItems = [];

    if(state.todos){
        todoItems = Array.prototype.map.call(state.todos, renderTodoItem).join('');
    }
    
    if(isEnabled('filterDone')){
        localStorage.setItem("checked", 2);
        const todosDone = state.todos.filter(item => item.done);
        todoItems = Array.prototype.map.call(todosDone, renderTodoItem).join('');
    }

    if(isEnabled('filterNotDone')){
        localStorage.setItem("checked", 1);
        const todosNotDone = state.todos.filter(item => !item.done);
        todoItems = Array.prototype.map.call(todosNotDone, renderTodoItem).join('');

    }
    
    el.innerHTML = renderApp(
        renderInput(),
        renderTodos(todoItems),
        renderCheckbox()
    );
}

function renderApp(input, todoList, checkbox) {
    
    if(isEnabled('renderBottom') & (isEnabled('filterDone') || isEnabled('filterNotDone')) & isEnabled('filterTop')){
        return renderAppFilterTop(input, todoList, checkbox);
        }else if(isEnabled('renderBottom')) {
            return renderAddTodoAtBottom(input, todoList, checkbox);
        }else{
            return renderAddTodoAtTop(input, todoList, checkbox);
        }
}

function renderAppFilterTop(input, todoList, chebox){
    return `<div id="app">
                <h3>ToDo List</h3>
                ${chebox}
                ${input}
                ${todoList}
            </div>`;
}

function renderAddTodoAtTop(input, todoList, chebox) {
    return `<div id="app">
                <h3>ToDo List</h3>
                ${input}
                ${todoList}
                ${chebox}
            </div>`;
}

function renderAddTodoAtBottom(input, todoList, chebox) {
    return `<div id="app">
                <h3>ToDo List</h3>
                ${todoList}
                ${input}
                ${chebox}
            </div>`;
}

function renderCheckbox(){
    const getStorage = JSON.parse(localStorage.getItem('checked'));
    
    return `Exibir somente:&nbsp;
            <div class="form-check form-check-inline">
                <label class="form-check-label">
                    <input class="form-check-input" type="radio" name="filter" id="filter" value="0" ${getStorage == 0 || getStorage == null ? 'checked' : ''}>Todos 
                </label>
            </div>
            <div class="form-check form-check-inline">
                <label class="form-check-label">
                    <input class="form-check-input" type="radio" name="filter" id="filterNotDone" value="1" ${getStorage == 1 ? 'checked' : ''}>Em aberto
                </label>
            </div>
            <div class="form-check form-check-inline">
                <label class="form-check-label">
                    <input class="form-check-input" type="radio" name="filter" id="filterDone" value="2" ${getStorage == 2 ? 'checked' : ''}>Finalizada
                </label>
            </div>`;
}

function renderInput() {
    return `<form action="#" id="formList" class="form-inline">
                <div class="input-group input-group-sm">
                    <input type="text" id="todoInput" class="form-control" placeHolder="Digite sua tarefa..." />
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
    const statusLabel = todo.done ? '<span class="badge badge-success">Finalizada</span>' : '<span class="badge badge-primary">Em aberto</span>';

    return `<li class="list-group-item">
                <div class="d-flex w-100 justify-content-between">
                    <h7 class="mb-1">
                        <input class="mb-1 js_toggle_todo" type="checkbox" data-id="${todo.id}"${todo.done ? ' checked' : ''} />
                        ${todo.text}
                    </h7>
                    <small>${statusLabel}</small>
                </div>
            </li>`;
}