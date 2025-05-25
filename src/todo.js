import { format } from "date-fns";

const createTodo = function(title, description, priority, due, project){
    let currentDate = new Date();
    let formattedDate = format(currentDate, "MMM d, yyyy");
    return {
        title: title,
        description: description,
        priority: priority,
        due: due,
        project: project,
        created: formattedDate,

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