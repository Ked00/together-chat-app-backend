const mongoose = require("mongoose");

const User = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    userPic: {
        type: Buffer,
    },

    session: {
        type: String,
        required: true
    },

    alerts: {
        type: Number,
        default: 0
    },

    friends: {
        type: Array,
    }
})

module.exports = mongoose.model("User", User)