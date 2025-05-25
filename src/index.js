import * as display from "./display.js";
import * as list from "./list.js";
import * as storage from "./storage.js";
import * as todo from "./todo.js";
import { format } from "date-fns";
import './styles.css';

let newTodo = todo.createTodo('Brush Teeth', 'Circular motion, at least 2 minutes', 'red', 'May 25, 2025', 'none');
let newTodo2 = todo.createTodo('Make Bed', 'Sheets go under the decorative pillows', 'yellow', 'May 27, 2025', 'none');
let newTodo3 = todo.createTodo('Eat Breakfast', 'Anything is good, just get something in your belly', 'blue', 'May 25, 2025', 'none');
list.addTodo(newTodo);
list.addTodo(newTodo2);
list.addTodo(newTodo3);
console.log(list.getList());

let active = document.querySelector('.active');
display.renderList(active, list.getList());

const newTodoButton = document.querySelector('.todo-list button');
const dialog = document.querySelector('dialog');

document.addEventListener('click', (e) => {
    console.log('working');
    if(e.target.classList.contains('toggle-info')){
        let todoElement = e.target.closest('.todo');
        display.toggleInfo(todoElement);
    }
});


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