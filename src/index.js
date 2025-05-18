import * as display from "./display.js";
import * as lists from "./lists.js";
import { format } from "date-fns";
import './styles.css';

const list = lists.createList();
let todoList = list.getList();
window.list = list;


const projects = lists.createProjects();
let projectsList = projects.getProjects();
window.projects = projects;


const storage = (function(){
    const packageList = (ls) => JSON.stringify(ls);

    const unpackageList = (ls) => JSON.parse(ls);

    const saveList = (ls) => {
        let listToSave = packageList(ls);
        localStorage.setItem('todo-list', listToSave);
    }

    const loadList = () => {
        let listToUnpackage = localStorage.getItem('todo-list');
        let listToLoad = unpackageList(listToUnpackage);
        return listToLoad;
    }

    return { saveList, loadList }
})();




const createTodo = function(title, description, priority, due){
    return {
        title: title,
        description: description,
        priority: priority,
        due: due,

        completion: 'incomplete',
        toggle: function() {
            if(this.completion == 'incomplete'){
                this.completion = 'complete';
            } else {
                this.completion = 'incomplete';
            }
        }
    }
}



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
    list.addTodo(newTodo);

    dialog.close();

    titleInput.value = '';
    descriptionInput.value = '';
    priorityInput.value = '';
    dueInput.value = '';

    display.renderList(todoListElement, todoList);
})