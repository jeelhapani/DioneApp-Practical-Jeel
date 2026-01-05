const mongoose = require("mongoose");

const userModel = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
            trim: true
        },
        email: {
            type: String,
            require: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            require: true,
            unique: true,
            trim: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("user", userModel);