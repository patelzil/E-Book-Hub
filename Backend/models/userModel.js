const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "A user must have FirstName"],
    },
    lastName: {
        type: String,
        required: [true, "A user must have lastName"],
    },
    eMail: {
        type: String,
        required: [true, "A user must have Email"],
        unique: true,
    },
    username: {
        type: String,
        required: [true, "A user must have username"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "A user must have password"],
    },

    bookclub: [{
        bookclubName: {
            type: String,
            required: [true, "A Bookclub must have Name"],
        },

        info: {
            type: String,
            required: [true, "A Bookclub must have bookclub's information"],
        },

        Users: [{
            type: String,
        }, ],

        MessagesInfo: [{
            sender: {
                type: String,
            },
            time: {
                type: String,
            },
            message: {
                type: String,
            },
        }, ],
    }, ],
});

const Users = mongoose.model("Users", userSchema);

const TestUsers = mongoose.model("TestUsers", userSchema);

(module.exports = Users), TestUsers;