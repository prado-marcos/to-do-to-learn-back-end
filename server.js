const express = require("express");
const cors = require("cors");
const app = express();
const corsOptions = {
    origin: "http://localhost:3001",
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.text());
app.get("/", (req, res) => {
    res.send("Hello World");
});
require("./src/routes/person.routes")(app);
require("./src/routes/task.routes")(app);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is runing on PORT ${PORT}...`));
