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

export { createList }