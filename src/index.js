import './styles.css';

const createList = function(){
    let ls = [];

    const getList = () => ls;

    const setList = (array) => ls = array;

    const getTodo = (index) => ls[index];

    const setTodo = (index, todo) => ls[index] = todo;

    const addTodo = (todo) => ls.push(todo);

    const removeTodo = (index) => ls.splice(index, 1);

    return { getList, setList, getTodo, setTodo, addTodo, removeTodo }
};

const list = createList();
let todoList = list.getList();
window.list = list;



const projects = (function(){
    let prjs = [];

    const getProjects = () => prjs;

    const setProjects = (array) => prjs = array;

    const getProject = (index) => prjs[index];

    const setProject = (index, prj) => prjs[index] = prj;

    const addProject = (prj) => prjs.push(prj);

    const removeProject = (index) => prjs.splice(index, 1);

    const createProject = function(name){
        const { getList, setList, getTodo, setTodo, addTodo, removeTodo } = createList();
    
        let currentName = name;
    
        const getName = () => currentName;
    
        const setName = (newName) => currentName = newName;
    
        return { getList, setList, getTodo, setTodo, addTodo, removeTodo, getName, setName }
    }

    return { getProjects, setProjects, getProject, setProject, addProject, removeProject, createProject }
})();




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



const todoListElement = document.querySelector('.todo-list');

const display = (function(){
    const renderTodo = (parent, todo) => {
        let todoElement = document.createElement('div');

        let titleElement = document.createElement('h3');
        titleElement.textContent = todo.title;
        todoElement.appendChild(titleElement);

        let descriptionElement = document.createElement('p');
        descriptionElement.textContent = todo.description;
        todoElement.appendChild(descriptionElement);

        let priorityElement = document.createElement('p');
        priorityElement.textContent = todo.priority;
        todoElement.appendChild(priorityElement);

        let dueElement = document.createElement('p');
        dueElement.textContent = todo.due;
        todoElement.appendChild(dueElement);

        parent.appendChild(todoElement);
    }

    const renderList = (parent, list) => {
        list.forEach((todo) => {
            renderTodo(parent, todo);
        })
    }

    return { renderList }
})();

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
    let newDue = dueInput.value;

    let newTodo = createTodo(newTitle, newDescription, newPriority, newDue);
    list.addTodo(newTodo);

    dialog.close();
})