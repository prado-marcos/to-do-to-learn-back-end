const task = require("./model");
const sql = require("./db");
class Task extends task {
    constructor(task) {
        super();
        this.personId = task.personId;
        this.title = task.title;
        this.description = task.description;
        this.taskStatus = task.taskStatus;
    }
}

Task.updateById = function (id, task, result) {
    sql.query(
        "UPDATE task SET title = ?, description = ?, taskStatus = ? WHERE id = ?",
        [task.title, task.description, task.taskStatus, id],
        (err, res) => {
            if (err) {
                console.log(err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            console.log(`updated task: `, { id: id, ...task });
            result(null, { id: id, ...task });
        }
    );
};

module.exports = Task;
