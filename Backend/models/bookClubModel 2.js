const mongoose = require("mongoose");

const bookclubSchema = mongoose.Schema({
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
});

const bookClub = mongoose.model("bookclub", bookclubSchema);

module.exports = bookClub;