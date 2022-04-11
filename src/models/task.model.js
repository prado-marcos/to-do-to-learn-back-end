const Model = require("./model");

class Task extends Model {
    constructor(task) {
        super();
        this.personId = task.personId;
        this.title = task.title;
        this.description = task.description;
        this.taskStatus = task.taskStatus;
    }
}

module.exports = Task;
