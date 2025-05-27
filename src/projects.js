let prjs = [];

const getProjects = () => prjs;

const setProjects = (array) => prjs = array;

const getProject = (name) => {
    for(let i = 0; i < prjs.length; i++){
        if(prjs[i] == name){
            return prjs[i];
        }
    }
};

const setProject = (name, project) => {
    for(let i = 0; i < prjs.length; i++){
        if(prjs[i] == name){
            prjs[i] = project;
        }
    }
};

const addProject = (project) => prjs.push(project);

const removeProject = (name) => {
    for(let i = 0; i < prjs.length; i++){
        if(prjs[i] == name){
            prjs.splice(i, 1);
        }
    }
};

export { getProjects, setProjects, getProject, setProject, addProject, removeProject };