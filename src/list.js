import {
  isBefore,
  isThisMonth,
  isThisWeek,
  isToday,
  startOfDay,
} from "date-fns";

let ls = [];

const getList = () => ls;

const sortList = (sort = "all") => {
  let lsSorted = [];
  let today = startOfDay(new Date());
  if (sort == "all") {
    lsSorted = ls;
  } else if (sort == "today") {
    ls.forEach((todo) => {
      if (isToday(todo.due)) {
        lsSorted.push(todo);
      }
    });
  } else if (sort == "thisWeek") {
    ls.forEach((todo) => {
      if (isThisWeek(todo.due)) {
        lsSorted.push(todo);
      }
    });
  } else if (sort == "thisMonth") {
    ls.forEach((todo) => {
      if (isThisMonth(todo.due)) {
        lsSorted.push(todo);
      }
    });
  } else if (sort == "overdue") {
    ls.forEach((todo) => {
      let due = startOfDay(todo.due);
      if (isBefore(due, today)) {
        lsSorted.push(todo);
      }
    });
  } else {
    ls.forEach((todo) => {
      if (sort == todo.project) {
        lsSorted.push(todo);
      }
    });
  }
  return lsSorted;
};

const orderList = (order = "dueNew") => {
  if (order == "creationOld") {
    ls.sort((a, b) => {
      console.log("creationOld");
      console.log(a.created);
      console.log(b.created);
      console.log(a.created - b.created);
      return a.created - b.created;
    });
  } else if (order == "creationNew") {
    ls.sort((a, b) => {
      console.log("creationNew");
      return b.created - a.created;
    });
  } else if (order == "dueNew") {
    ls.sort((a, b) => {
      return a.due - b.due;
    });
  } else if (order == "dueOld") {
    ls.sort((a, b) => {
      return b.due - a.due;
    });
  } else if (order == "priority") {
    let lsPriority = [];
    let red = ls.filter((todo) => todo.priority == "red");
    red.forEach((todo) => lsPriority.push(todo));
    let yellow = ls.filter((todo) => todo.priority == "yellow");
    yellow.forEach((todo) => lsPriority.push(todo));
    let blue = ls.filter((todo) => todo.priority == "blue");
    blue.forEach((todo) => lsPriority.push(todo));
    setList(lsPriority);
  } else if (order == "nameAsc") {
    ls.sort((a, b) => {
      return a.title.localeCompare(b.title);
    });
  } else if (order == "nameDesc") {
    ls.sort((a, b) => {
      return b.title.localeCompare(a.title);
    });
  }
};

const setList = (array) => (ls = array);

const findIndexById = (id) => ls.findIndex((todo) => todo.id == id);

const getTodoById = (id) => {
  const index = findIndexById(id);
  if (index !== -1) {
    return ls[index];
  }
};

const setTodoById = (id, todo) => {
  const index = findIndexById(id);
  if (index !== -1) {
    ls[index] = todo;
  }
};

const addTodo = (todo) => ls.push(todo);

const removeTodoById = (id) => {
  const index = findIndexById(id);
  if (index !== -1) {
    ls.splice(index, 1);
  }
};

export {
  getList,
  sortList,
  orderList,
  setList,
  getTodoById,
  setTodoById,
  addTodo,
  removeTodoById,
};
