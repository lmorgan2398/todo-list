import * as display from "./display.js";
import * as list from "./list.js";
import * as storage from "./storage.js";
import * as todo from "./todo.js";
import { format } from "date-fns";
import './styles.css';

let todoList = list.createList();
window.todoList = todoList;

const todoListElement = document.querySelector('.todos');

const newTodoButton = document.querySelector('.todo-list button');
const dialog = document.querySelector('dialog');

newTodoButton.addEventListener('click', () => {
    dialog.showModal();
})

const saveNewTodoButton = document.querySelector('dialog form button');
const titleInput = document.querySelector('dialog form #title');
const descriptionInput = document.querySelector('dialog form #description');
const priorityInput = document.querySelector('dialog form #priority');
const dueInput = document.querySelector('dialog form #due');

saveNewTodoButton.addEventListener('click', () => {
    let newTitle = titleInput.value;
    let newDescription = descriptionInput.value;
    let newPriority = priorityInput.value;
    let newDue = format(dueInput.value, "MMM d, yyyy");

    let newTodo = createTodo(newTitle, newDescription, newPriority, newDue);
    todoList.addTodo(newTodo);

    dialog.close();

    titleInput.value = '';
    descriptionInput.value = '';
    priorityInput.value = '';
    dueInput.value = '';

    display.renderList(todoListElement, todoList);
})