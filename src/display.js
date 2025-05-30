import { format } from "date-fns";

const renderTodo = (parent, todo) => {
    let todoElementContainer = document.createElement('div');
    todoElementContainer.classList.add('todo-container');
    parent.appendChild(todoElementContainer);

    let todoElement = document.createElement('div');
    todoElement.classList.add('todo');    
    todoElement.classList.add('collapsed');
    if(todo.completion == 'completed'){
        todoElement.classList.add('completed-todo');
    } else {
        todoElement.classList.add(`${todo.priority}`);
    }    
    todoElementContainer.appendChild(todoElement);

    let todoHeader = document.createElement('div');
    todoHeader.classList.add('todo-header');
    todoElement.appendChild(todoHeader);

    let completedButton = document.createElement('input');
    completedButton.type = 'checkbox';
    completedButton.name = 'todo-completed';
    completedButton.id = 'todo-completed';
    todoHeader.appendChild(completedButton);

    let headerText = document.createElement('div');
    headerText.classList.add('header-text');
    todoHeader.appendChild(headerText);

    let todoTitle = document.createElement('h3');
    todoTitle.classList.add('todo-title');
    todoTitle.textContent = todo.title;
    headerText.appendChild(todoTitle);

    let dueDate = document.createElement('p');
    dueDate.classList.add('due-date');
    dueDate.textContent = `Due ${format(todo.due, 'MMM dd, yyyy')}`;
    headerText.appendChild(dueDate);

    let toggleInfo = document.createElement('button');
    toggleInfo.classList.add('toggle-info');
    toggleInfo.textContent = `\u25BC`;
    todoHeader.appendChild(toggleInfo);

    let todoInfo = document.createElement('div');
    todoInfo.classList.add('todo-info');
    todoElement.appendChild(todoInfo);

    let todoDescription = document.createElement('p');
    todoDescription.classList.add('description');
    todoDescription.textContent = todo.description;
    todoInfo.appendChild(todoDescription);

    let todoCreationDate = document.createElement('p');
    todoCreationDate.classList.add('creation-date');
    todoCreationDate.textContent = `Created on ${format(todo.created, 'MMM dd, yyyy')}`;
    todoInfo.appendChild(todoCreationDate);

    let deleteButton = document.createElement('button');
    deleteButton.classList.add('delete');
    deleteButton.textContent = '\u2716';
    todoInfo.appendChild(deleteButton);

    return todoElement;
}

const renderList = (list) => {
    let active = document.querySelector('.active');
    let completed = document.querySelector('.completed');
    while(active.firstChild){
        active.removeChild(active.firstChild);
    }
    while(completed.firstChild){
        completed.removeChild(completed.firstChild);
    }
    list.forEach((todo) => {
        if(todo.completion == 'active'){
            let todoElement = renderTodo(active, todo);
            todoElement.dataset.id = todo.id;
        } else if(todo.completion == 'completed'){
            let todoElement = renderTodo(completed, todo);
            todoElement.dataset.id = todo.id;
        }
    })
}

const toggleInfo = (todoElement) => {
    if(todoElement.classList.contains("collapsed")){
        todoElement.classList.remove("collapsed");
    } else {
        todoElement.classList.add("collapsed");
    }
}

const renderProjects = (projects) => {
    let projectList = document.querySelector('.projects-container');
    while(projectList.firstChild){
        projectList.removeChild(projectList.firstChild);
    }
    projects.forEach((project) => {
        let projectElement = document.createElement('button');
        projectElement.classList.add('project');
        projectElement.classList.add('sort');
        projectElement.dataset.sort = project;
        projectElement.textContent = project;
        projectList.appendChild(projectElement);
    })
}

const renderProjectsInput = (projects) => {
    let projectsInput = document.querySelector('#assign-project');
    while(projectsInput.firstChild){
        projectsInput.removeChild(projectsInput.firstChild);
    };
    let noneOption = document.createElement('option');
    noneOption.value = 'None';
    noneOption.textContent = 'None';
    projectsInput.appendChild(noneOption);
    projects.forEach((project) => {
        let projectOption = document.createElement('option');
        projectOption.value = project;
        projectOption.textContent = project;
        projectsInput.appendChild(projectOption);
    })
}

const renderDateInput = (input) => {
    let today = new Date();
    input.value = format(today, 'yyyy-MM-dd');
}

export { renderList, toggleInfo, renderProjects, renderProjectsInput, renderDateInput };