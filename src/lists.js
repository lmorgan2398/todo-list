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

const createProjects = function(){
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
};

export { createList, createProjects }