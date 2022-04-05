"use strict";

const mysql = require("mysql");

const dbConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mysql",
    database: "to_do_to_learn",
});

dbConnection.connect((err) => {
    if (err) throw err;
    console.log("Database Connected!");
});

module.exports = dbConnection;
