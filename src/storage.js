import * as todo from "./todo.js";

const packageList = (ls) => JSON.stringify(ls);

const unpackageList = (ls) => JSON.parse(ls);

const saveList = (ls) => {
    let listToSave = packageList(ls);
    localStorage.setItem('todo-list', listToSave);
}

const loadList = () => {
    if(localStorage.getItem('todo-list')){
        let listToUnpackage = localStorage.getItem('todo-list');
        let listToRehydrate = unpackageList(listToUnpackage);
        const listToLoad = listToRehydrate.map(data => {
            let rehydrated = todo.createTodo(
                data.title,
                data.description,
                data.priority,
                data.due,
                data.project,
            )
            rehydrated.created = data.created;
            rehydrated.completion = data.completion;

            return rehydrated;
        });

        return listToLoad;
    } else {
        return null;
    }
}


export { saveList, loadList };