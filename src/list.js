let ls = [];

const getList = () => ls;

const setList = (array) => ls = array;

const findIndexById = (id) => ls.findIndex(todo => todo.id == id);

const getTodoById = (id) => {
    const index = findIndexById(id);
    if(index !== -1) { 
        return ls[index] 
    }
};

const setTodoById = (id, todo) => {
    const index = findIndexById(id);
    if(index !== -1) { 
        ls[index] = todo
    };
};

const addTodo = (todo) => ls.push(todo);

const removeTodoById = (id) => {
    const index = findIndexById(id);
    if(index !== -1) { 
        ls.splice(index, 1) 
    };
};

export { getList, setList, getTodoById, setTodoById, addTodo, removeTodoById };