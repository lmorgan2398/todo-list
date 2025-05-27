import * as display from "./display.js";
import * as list from "./list.js";
import * as storage from "./storage.js";
import * as todo from "./todo.js";
import { format } from "date-fns";
import './styles.css';


document.addEventListener('click', (e) => {
    if(e.target.classList.contains('toggle-info')){
        let todoElement = e.target.closest('.todo');
        display.toggleInfo(todoElement);
    }
});

// Declare querySelectors, add functionality to newTodo buttons
const newTodoButton = document.querySelector('.new-todo');
const dialog = document.querySelector('dialog');

newTodoButton.addEventListener('click', () => {
    dialog.showModal();
})

const saveNewTodoButton = document.querySelector('dialog form button');
const titleInput = document.querySelector('dialog form #title');
const descriptionInput = document.querySelector('dialog form #description');
const dueInput = document.querySelector('dialog form #due');

saveNewTodoButton.addEventListener('click', () => {
    let newTitle = titleInput.value;
    let newDescription = descriptionInput.value;
    let newPriority = document.querySelector('input[name="priority"]:checked').value;
    let newDue = format(dueInput.value, "MMM d, yyyy");

    let newTodo = todo.createTodo(newTitle, newDescription, newPriority, newDue, 'none');
    list.addTodo(newTodo);
    storage.saveList(list.getList());

    dialog.close();

    titleInput.value = '';
    descriptionInput.value = '';
    dueInput.value = '';

    display.renderList(list.getList());
})

document.addEventListener('click', (e) => {
    if(e.target.id == 'todo-completed'){
        let todoElement = e.target.closest('.todo');
        let index = todoElement.dataset.index;
        let todo = list.getTodo(index);
        todo.toggle();
        list.setTodo(index, todo);
        storage.saveList(list.getList());
        display.renderList(list.getList());
    }
});

// Make sure dialog is closed on page load
document.addEventListener('DOMContentLoaded', () => {
    if(dialog.open){
        console.log('working');
        dialog.close();
    }

    // First try to load a saved list
    const savedList = storage.loadList();

    if(savedList && savedList.length > 0){
        // If it exists and contains a list, load it
        list.setList(savedList);
    } else {
        // If not, create some todo templates
        let newTodo = todo.createTodo('Brush Teeth', 'Circular motion, at least 2 minutes', 'red', 'May 25, 2025', 'none');
        let newTodo2 = todo.createTodo('Make Bed', 'Sheets go under the decorative pillows', 'yellow', 'May 27, 2025', 'none');
        let newTodo3 = todo.createTodo('Eat Breakfast', 'Anything is good, just get something in your belly', 'blue', 'May 25, 2025', 'none');
        list.addTodo(newTodo);
        list.addTodo(newTodo2);
        list.addTodo(newTodo3);
        storage.saveList(list.getList());
    }

    display.renderList(list.getList());
})

