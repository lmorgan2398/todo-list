const createTodo = function(title, description, priority, due, project){
    return {
        title: title,
        description: description,
        priority: priority,
        due: due,
        project: project,

        completion: 'incomplete',
        toggle: function() {
            if(this.completion == 'incomplete'){
                this.completion = 'complete';
            } else {
                this.completion = 'incomplete';
            }
        }
    }
}

export { createTodo };