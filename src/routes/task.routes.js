module.exports = (app) => {
    const task = require("../controllers/task.controller");
    const router = require("express").Router();
    router.post("/", task.create);
    router.put("/:id", task.update);
    router.get("/", task.findAll);
    router.get("/:id", task.findOne);
    router.delete("/:id", task.delete);
    router.delete("/", task.deleteAll);
    app.use("/api/task", router);
};
