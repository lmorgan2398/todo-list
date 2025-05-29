import * as display from "./display.js";
import * as list from "./list.js";
import * as storage from "./storage.js";
import * as todo from "./todo.js";
import * as projects from "./projects.js";
import { format, parse } from "date-fns";
import './styles.css';

// Toggle info button
document.addEventListener('click', (e) => {
    if(e.target.classList.contains('toggle-info')){
        let todoElement = e.target.closest('.todo');
        display.toggleInfo(todoElement);
    }
});

// Button to sort and display selected todos
let sort;
document.addEventListener('click', (e) => {
    if(e.target.classList.contains('sort')){
        sort = e.target.dataset.sort;
        display.renderList(list.sortList(sort));
    }
})

// Declare querySelectors, add functionality to newTodo buttons
const newTodoButton = document.querySelector('.new-todo');
const dialog = document.querySelector('dialog');

newTodoButton.addEventListener('click', () => {
    display.renderProjectsInput(projects.getProjects());
    display.renderDateInput(dueInput);
    titleInput.style.outline = '1px solid black';
    descriptionInput.style.outline = '1px solid black';
    dialog.showModal();
})

const saveNewTodoButton = document.querySelector('dialog form button');
const titleInput = document.querySelector('dialog form #title');
const descriptionInput = document.querySelector('dialog form #description');
const dueInput = document.querySelector('dialog form #due');

saveNewTodoButton.addEventListener('click', () => {
    if(titleInput.value.trim() !== '' && descriptionInput.value.trim() !== ''){
        let newTitle = titleInput.value;
        let newDescription = descriptionInput.value;
        let newPriority = document.querySelector('input[name="priority"]:checked').value;
        let newDue = parse(dueInput.value, 'yyyy-MM-dd', new Date());

        let newTodo = todo.createTodo(newTitle, newDescription, newPriority, newDue, 'none');
        list.addTodo(newTodo);
        storage.saveList(list.getList());

        dialog.close();

        titleInput.value = '';
        descriptionInput.value = '';
        dueInput.value = '';

        display.renderList(list.sortList(sort));
        // Alert user if there is no title/desc input
    } else {
        if(titleInput.value.trim() == ''){
            console.log('title');
            titleInput.style.outline = '2px solid red';
        };
        if(descriptionInput.value.trim() == ''){
            console.log('desc');
            descriptionInput.style.outline = '2px solid red';
        };
    }
});

titleInput.addEventListener('input', () => {
    if(titleInput.value.trim() !== ''){
        titleInput.style.outline = '1px solid black';
    };
})

descriptionInput.addEventListener('input', () => {
    if(descriptionInput.value.trim() !== ''){
        descriptionInput.style.outline = '1px solid black';
    }
})

// Add functionality to new project button
const newProjectButton = document.querySelector('.new-project');
const projectDialog = document.querySelector('.project-dialog');
newProjectButton.addEventListener('click', () => {
    projectDialog.showModal();
})

const projectButton = document.querySelector('.project-button');
const projectNameInput = document.querySelector('#project');
projectButton.addEventListener('click', () => {
    let newName = projectNameInput.value;

    projects.addProject(newName);
    console.log(projects.getProjects());
    console.log(projects.getProject(newName));
    display.renderProjects(projects.getProjects());

    projectDialog.close();

    projectNameInput.value = '';
})

// Event listener for deleting a todo
document.addEventListener('click', (e) => {
    if(e.target.classList.contains('delete')){
        let todoElement = e.target.closest('.todo');
        let id = todoElement.dataset.id;
        list.removeTodoById(id);
        storage.saveList(list.getList());
        display.renderList(list.sortList(sort));
    }
})

// Event listener for completion checkbox
document.addEventListener('click', (e) => {
    if(e.target.id == 'todo-completed'){
        let todoElement = e.target.closest('.todo');
        let id = todoElement.dataset.id;
        let todo = list.getTodoById(id);
        todo.toggle();
        list.setTodoById(id, todo);
        storage.saveList(list.getList(''));
        display.renderList(list.sortList(sort));
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
        let newTodo = todo.createTodo('Create your first todo', 'Click the button atop this page', 'red', new Date(), 'none');
        let newTodo2 = todo.createTodo('Create a project', 'Projects are like folders for your todos, button is atop this page', 'yellow', new Date(), 'none');
        let newTodo3 = todo.createTodo('Complete a todo', 'Once you have completed a task, check the circle to the left to mark it as completed!', 'blue', new Date(), 'none');
        list.addTodo(newTodo);
        list.addTodo(newTodo2);
        list.addTodo(newTodo3);
        storage.saveList(list.getList());
    }

    display.renderList(list.sortList(sort));
})

