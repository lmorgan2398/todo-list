const renderTodo = (parent, todo) => {
    let todoElement = document.createElement('li');

    let titleElement = document.createElement('h3');
    titleElement.textContent = todo.title;
    todoElement.appendChild(titleElement);

    let descriptionElement = document.createElement('p');
    descriptionElement.textContent = todo.description;
    todoElement.appendChild(descriptionElement);

    let elementPriority = todo.priority;
    todoElement.classList.add(elementPriority);

    let dueElement = document.createElement('p');
    dueElement.textContent = `Due ${todo.due}`;
    todoElement.appendChild(dueElement);

    parent.appendChild(todoElement);
}

const renderList = (parent, list) => {
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
    list.forEach((todo) => {
        renderTodo(parent, todo);
    })
}

export { renderList };