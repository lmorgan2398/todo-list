console.log('working');

// Create module to store and manipulate the array of todos
const list = (function(){
    let ls = [];

    const getList = () => ls;

    const setList = (array) => ls = array;

    const getTodo = (index) => ls[index];

    const setTodo = (index, todo) => ls[index] = todo;

    const addTodo = (todo) => ls.push(todo);

    const removeTodo = (index) => ls.splice(index, 1);

    return { getList, setList, getTodo, setTodo, addTodo, removeTodo }
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