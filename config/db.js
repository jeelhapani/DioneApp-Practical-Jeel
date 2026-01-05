const mongoose = require("mongoose");
require("dotenv").config({ quiet: true });

function dbConnection() {
    mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("DB Connected");
    })
    .catch((err) => {
        console.log(err);
    });
}

module.exports = dbConnection();