import * as display from "./display.js";
import * as list from "./list.js";
import * as storage from "./storage.js";
import * as todo from "./todo.js";
import * as projects from "./projects.js";
import { format, parse } from "date-fns";
import './styles.css';

// Toggle order button
let order;
let orderButton = document.querySelector('#order');
orderButton.addEventListener('input', ()=> {
    console.log('working');
    order = orderButton.value;
    console.log(order);
    list.orderList(order);
    display.renderList(list.sortList(sort));
})

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
        display.renderCurrentSort(sort);
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
    dialogHeader.textContent = 'New Todo';
    saveNewTodoButton.dataset.mode = 'new';
    saveNewTodoButton.dataset.id = 'none';
    dialog.showModal();
})

const saveNewTodoButton = document.querySelector('dialog form button');
const titleInput = document.querySelector('dialog form #title');
const descriptionInput = document.querySelector('dialog form #description');
const dueInput = document.querySelector('dialog form #due');
const projectInput = document.querySelector('dialog #assign-project');

saveNewTodoButton.addEventListener('click', () => {
    if(titleInput.value.trim() !== '' && descriptionInput.value.trim() !== ''){
        const mode = saveNewTodoButton.dataset.mode;
        if(mode == 'new'){
            let newTitle = titleInput.value;
            let newDescription = descriptionInput.value;
            let newPriority = document.querySelector('input[name="priority"]:checked').value;
            let newDue = parse(dueInput.value, 'yyyy-MM-dd', new Date());
            let newProject = projectInput.value;

            let newTodo = todo.createTodo(newTitle, newDescription, newPriority, newDue, newProject);
            list.addTodo(newTodo);
            list.orderList(order);
            storage.saveList(list.getList());

            dialog.close();

            titleInput.value = '';
            descriptionInput.value = '';
            dueInput.value = '';

            display.renderList(list.sortList(sort));
        } else if(mode == 'edit'){
            let currentId = saveNewTodoButton.dataset.id;
            let currentTodo = list.getTodoById(currentId);

            let editedTitle = titleInput.value;
            let editedDescription = descriptionInput.value;
            let editedPriority = document.querySelector('input[name="priority"]:checked').value;
            let editedDue = parse(dueInput.value, 'yyyy-MM-dd', new Date());
            let editedProject = projectInput.value;

            let editedTodo = todo.createTodo(editedTitle, editedDescription, editedPriority, editedDue, editedProject);
            editedTodo.completion = currentTodo.completion;
            editedTodo.created = currentTodo.created;
            editedTodo.id = currentTodo.id;

            list.setTodoById(currentId, editedTodo);
            list.orderList(order);
            storage.saveList(list.getList());

            dialog.close();

            titleInput.value = '';
            descriptionInput.value = '';
            dueInput.value = '';

            display.renderList(list.getList());
        }
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
    projectNameInput.style.outline = '1px solid black';
    projectDialog.showModal();
})

const projectButton = document.querySelector('.project-button');
const projectNameInput = document.querySelector('#project');
projectButton.addEventListener('click', () => {
    if(projectNameInput.value.trim() !== ''){
        let newName = projectNameInput.value;

        projects.addProject(newName);
        storage.saveProjects(projects.getProjects());
        display.renderProjects(projects.getProjects());

        projectDialog.close();

        projectNameInput.value = '';
    } else {
        projectNameInput.style.outline = '2px solid red';
    }
})

// Event listener for deleting a todo
document.addEventListener('click', (e) => {
    if(e.target.classList.contains('delete')){
        let todoElement = e.target.closest('.todo');
        let id = todoElement.dataset.id;
        list.removeTodoById(id);
        list.orderList(order);
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
    const savedProjects = storage.loadProjects();

    if(savedList && savedList.length > 0){
        // If it exists and contains a list, load it
        list.setList(savedList);
    } else {
        // If not, create some todo templates
        let newTodo = todo.createTodo('Create your first todo', 'Click the button atop this page', 'red', new Date(), 'None');
        let newTodo2 = todo.createTodo('Create a project', 'Projects are like folders for your todos, button is atop this page', 'yellow', new Date(), 'None');
        let newTodo3 = todo.createTodo('Complete a todo', 'Once you have completed a task, check the circle to the left to mark it as completed!', 'blue', new Date(), 'None');
        list.addTodo(newTodo);
        list.addTodo(newTodo2);
        list.addTodo(newTodo3);
        storage.saveList(list.getList());
    }

    if(savedProjects && savedProjects.length > 0){
        projects.setProjects(savedProjects);
    }

    list.orderList(order);
    display.renderList(list.sortList(sort));
    display.renderProjects(projects.getProjects());
})

// Create event listener to close dialogs with esc
document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape'){
        if(dialog.open){
            titleInput.value = '';
            descriptionInput.value = '';
            dueInput.value = '';
            dialog.close();
        }
        if(projectDialog.open){
            projectNameInput.value = '';
            projectDialog.close();
        }
    }
})

// Create event listener to delete project buttons
document.addEventListener('click', (e) => {
    if(e.target.classList.contains('project-delete')){
        let currentProjectElement = e.target.closest('.project');
        let currentProjectName = currentProjectElement.dataset.sort;
        projects.removeProject(currentProjectName);
        storage.saveProjects(projects.getProjects());
        display.renderProjects(projects.getProjects());
    }
})

// Create edit todo button
let dialogHeader = document.querySelector('dialog h2');
document.addEventListener('click', (e) => {
    if(e.target.classList.contains('edit')){
        saveNewTodoButton.dataset.mode = 'edit';
        let currentTodoElement = e.target.closest('.todo');
        let currentTodoId = currentTodoElement.dataset.id;
        saveNewTodoButton.dataset.id = currentTodoId;
        let currentTodo = list.getTodoById(currentTodoId);
        
        dialogHeader.textContent = 'Edit Todo';

        titleInput.value = currentTodo.title;
        descriptionInput.value = currentTodo.description;
        display.renderProjectsInput(projects.getProjects());
        projectInput.value = currentTodo.project;
        dueInput.value = format(currentTodo.due, 'yyyy-MM-dd')
        display.clearPriotiyInput();
        let priorityInputs = document.querySelectorAll('input[type="radio"]');
        priorityInputs.forEach((input) => {
            if(input.value == currentTodo.priority){
                input.checked = true;
            }
        });

        dialog.showModal();
    }
})