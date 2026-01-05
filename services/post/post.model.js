const mongoose = require("mongoose");

const postModel = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            require: true
        },
        caption: {
            type: String,
            require: true,
            trim: true
        },
        likes: {
            type: Number,
            default: 0
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("post", postModel);