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