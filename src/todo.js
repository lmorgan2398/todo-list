import { format } from "date-fns";

const createTodo = function(title, description, priority, due, project){
    let currentDate = new Date();
    return {
        title: title,
        description: description,
        priority: priority,
        due: due,
        project: project,
        created: currentDate,

        completion: 'active',
        toggle: function() {
            if(this.completion == 'active'){
                this.completion = 'completed';
            } else {
                this.completion = 'active';
            }
        }
    }
}

export { createTodo };