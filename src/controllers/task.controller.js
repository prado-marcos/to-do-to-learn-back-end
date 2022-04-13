const Task = require("../models/task.model");
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Contente can not be empty!",
        });
    }
    const task = new Task({
        personId: req.body.personId,
        title: req.body.title,
        description: req.body.description,
        taskStatus: req.body.taskStatus,
    });
    Task.create(task, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    "Some error ocurred while creating the Task.",
            });
        else res.send(data);
    });
};

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    }
    console.log(req.body);
    Task.updateById(req.params.id, new Task(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found data with id ${req.params.id}`,
                });
            }
        } else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Task.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || `Some error ocurred while retrieving data`,
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Task.getById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found data with id ${req.params.id}`,
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving data with id " + req.params.id,
                });
            }
        } else res.send(data);
    });
};

exports.delete = (req, res) => {
    Task.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found task with id ${req.params.id}.`,
                });
            } else {
                res.status(500).send({
                    message: "Could not delete task with id " + req.params.id,
                });
            }
        } else res.send({ message: `Task was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    Task.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    "Some error ocurred while removing all data.",
            });
        else res.send({ message: "All data were deleted successfully" });
    });
};
