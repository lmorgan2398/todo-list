import * as todo from "./todo.js";

const packageArray = (arr) => JSON.stringify(arr);

const unpackageArray = (arr) => JSON.parse(arr);

const saveList = (ls) => {
    let listToSave = packageArray(ls);
    localStorage.setItem('todo-list', listToSave);
}

const loadList = () => {
    if(localStorage.getItem('todo-list')){
        let listToUnpackage = localStorage.getItem('todo-list');
        let listToRehydrate = unpackageArray(listToUnpackage);
        const listToLoad = listToRehydrate.map(data => {
            let rehydrated = todo.createTodo(
                data.title,
                data.description,
                data.priority,
                new Date(data.due),
                data.project,
            )
            rehydrated.created = new Date(data.created);
            rehydrated.completion = data.completion;

            return rehydrated;
        });

        return listToLoad;
    } else {
        return null;
    }
}

const saveProjects = (prjs) => {
    let projectsToSave = packageArray(prjs);
    localStorage.setItem('projects-list', projectsToSave);
}

const loadProjects = () => {
    if(localStorage.getItem('projects-list')){
        let projectsToUnpackage = localStorage.getItem('projects-list');
        let projectsList = unpackageArray(projectsToUnpackage);
        return projectsList;
    }
}


export { saveList, loadList, saveProjects, loadProjects };