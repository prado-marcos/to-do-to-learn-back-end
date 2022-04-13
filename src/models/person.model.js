const Model = require("./model");

class Person extends Model {
    constructor(person) {
        super();
        this.personName = person.personName;
        this.email = person.email;
    }
}

module.exports = Person;
