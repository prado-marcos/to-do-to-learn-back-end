module.exports = (app) => {
    const person = require("../controllers/person.controller");
    const router = require("express").Router();
    router.post("/", person.create);
    router.put("/:id", person.update);
    router.get("/", person.findAll);
    router.get("/:id", person.findOne);
    router.delete("/:id", person.delete);
    router.delete("/", person.deleteAll);
    app.use("/api/person", router);
};
