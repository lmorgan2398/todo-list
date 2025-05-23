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


export { saveList, loadList };