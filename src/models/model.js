const sql = require("./db");

class Model {}

Model.create = function (newObject, result) {
    sql.query(
        `INSERT INTO ${newObject.constructor.name} SET ?`,
        newObject,
        (err, res) => {
            if (err) {
                console.log(err);
                result(err, null);
                return;
            }
            console.log(`created ${newObject.constructor.name}: `, {
                id: res.insertId,
                ...newObject,
            });
            result(null, { id: res.insertId, ...newObject });
        }
    );
};

Model.getById = function (id, result) {
    sql.query(`SELECT * FROM ${this.name} WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log(`found ${this.name}: `, res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

Model.getAll = function (result) {
    sql.query(`SELECT * FROM ${this.name} `, (err, res) => {
        if (err) {
            console.log(err);
            result(null, err);
            return;
        }
        console.log(res);
        result(null, res);
    });
};

Model.updateById = function (id, model, result) {
    const objectKeysArray = Object.keys(model).map((value) => value + " = ? ");
    const objectValuesArray = Object.values(model);
    sql.query(
        `UPDATE ${this.name} SET ${objectKeysArray} WHERE id = ?`,
        [...objectValuesArray, id],
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
            console.log(`updated model: `, { id: id, ...model });
            result(null, { id: id, ...model });
        }
    );
};

Model.remove = function (id, result) {
    sql.query(`DELETE FROM ${this.name} WHERE id = ?`, id, (err, res) => {
        if (err) {
            console.log(err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log(`deleted ${this.name} with id: `, id);
        result(null, res);
    });
};

Model.removeAll = function (result) {
    sql.query(`DELETE FROM ${this.name}`, (err, res) => {
        if (err) {
            console.log(err);
            result(null, err);
            return;
        }
        console.log(`delete ${res.affectedRows} ${this.name}`);
        result(null, res);
    });
};

module.exports = Model;
