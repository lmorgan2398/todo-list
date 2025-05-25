const renderTodo = (parent, todo) => {
    let todoElementContainer = document.createElement('div');
    todoElementContainer.classList.add('todo-container');
    parent.appendChild(todoElementContainer);

    let todoElement = document.createElement('div');
    todoElement.classList.add('todo');    
    todoElement.classList.add('collapsed');
    todoElement.classList.add(`${todo.priority}`);
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
    dueDate.textContent = `Due ${todo.due}`;
    headerText.appendChild(dueDate);

    let toggleInfo = document.createElement('button');
    toggleInfo.classList.add('toggle-info');
    toggleInfo.textContent = 'v';
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
    todoCreationDate.textContent = `Created on ${todo.created}`;
    todoInfo.appendChild(todoCreationDate);

    let deleteButton = document.createElement('button');
    deleteButton.classList.add('delete');
    deleteButton.textContent = 'x';
    todoInfo.appendChild(deleteButton);

    return todoElement;
}

const renderList = (parent, list) => {
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
    list.forEach((todo, index) => {
        let todoElement = renderTodo(parent, todo);
        todoElement.dataset.index = index;
    })
}

const toggleInfo = (todoElement) => {
    if(todoElement.classList.contains("collapsed")){
        todoElement.classList.remove("collapsed");
    } else {
        todoElement.classList.add("collapsed");
    }
}

export { renderList, toggleInfo };