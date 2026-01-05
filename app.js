require("dotenv").config({ quiet: true });
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3333;

require("./config/db");

const bodyparser = require("body-parser");
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.all("/", (req, res, next) => {
    res.send("Task management running successfully");
});



app.use("/api", require("./routes/index.routes"));



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});