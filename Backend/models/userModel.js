const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "A user must have username"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "A user must have password"],
    },
});

const Users = mongoose.model("Users", userSchema);

module.exports = Users;