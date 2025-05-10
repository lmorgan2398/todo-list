console.log('working');

// Create module to store and manipulate the array of todos
const list = (function(){
    let ls = [];

    const get = () => ls;

    const add = (object) => ls.push(object);

    const remove = (index) => ls.splice(index, 1);

    return { get, add, remove }
})();