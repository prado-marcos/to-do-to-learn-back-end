const Person = require("../models/person.model");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Contente can not be empty!",
        });
    }
    const person = new Person({
        personName: req.body.personName,
        email: req.body.email,
    });
    Person.create(person, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    "Some error ocurred while creating the Person.",
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
    Person.updateById(req.params.id, new Person(req.body), (err, data) => {
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
    Person.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || `Some error ocurred while retrieving data`,
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Person.findById(req.params.id, (err, data) => {
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
    Person.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found data with id ${req.params.id}`,
                });
            } else {
                res.status(500).send({
                    message: "Could not delete data with id " + req.params.id,
                });
            }
        } else res.send({ message: `Data was delete successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    Person.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    "Some error ocurred while removing all data.",
            });
        else res.send({ message: "All data were deleted successfully" });
    });
};
