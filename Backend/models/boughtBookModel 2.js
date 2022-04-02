const mongoose = require("mongoose");

let bookSchema = mongoose.Schema({
    id: {
        type: String,
        require: [true, "Book must have an id"],
    },

    username: {
        type: String,
        require: [true, "Book must have a user who paid for the book"],
    },

    title: {
        type: String,
        require: [true, "Book must have an title"],
    },

    subTitle: {
        type: String,
        require: [true, "Book must have an subtitle"],
    },
    category: [{
        type: String,
        require: [true, "Book must have an category"],
    }, ],

    authors: [{
        type: String,
    }, ],

    publisher: {
        type: String,
    },

    publishDate: {
        type: String,
    },

    description: {
        type: String,
        require: [true, "Book must have an description"],
    },

    pageCount: {
        type: Number,
    },

    imageLink: {
        smallThumbnail: {
            type: String,
        },

        thumbnail: {
            type: String,
        },
    },

    price: {
        type: String,
    },

    rating: {
        type: Number,
    },
});

const boughtBooks = mongoose.model("boughtBooks", bookSchema);

module.exports = boughtBooks;