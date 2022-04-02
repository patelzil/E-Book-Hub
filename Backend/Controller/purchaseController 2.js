const boughtBooks = require("../models/boughtBookModel.js");
const Users = require("../models/userModel.js");

exports.checkPaymentValidation = async(req, res) => {
    try {
        let userExist = await Users.exists({ username: req.body.username });
        if (userExist) {
            let bookExist = await boughtBooks.exists({ title: req.body.title });

            let books = await boughtBooks.find({ title: req.body.title });

            let isThereBook = false;
            for (let i = 0; i < books.length && !isThereBook; i++) {
                if (books[i].username === req.body.username) {
                    isThereBook = true;
                }
            }
            if (!isThereBook) {
                let bookadded = await boughtBooks.create(req.body);

                res.status(200).json({
                    found: bookadded,
                });
            } else {
                res.status(404).json({
                    status: "failed",
                    message: "Book already exist title: " + req.body.title,
                });
            }
        } else {
            res.status(404).json({
                status: "failed",
                message: "No such user: " + req.body.username,
            });
        }
    } catch (err) {
        res.status(404).json({
            status: "failed",
            message: err.message,
            description: "Failed to buy book",
        });
    }
};

exports.getAllBooks = async(req, res) => {
    try {
        let userExist = await Users.exists({ username: req.body.username });

        if (userExist) {
            let books = await boughtBooks.find({ username: req.body.username });

            res.status(200).json({
                found: books,
            });
        } else {
            res.status(404).json({
                status: "failed",
                message: "No such user: " + req.body.username,
            });
        }
    } catch (err) {
        res.status(404).json({
            status: "failed",
            message: err.message,
            description: "Failed to get all books",
        });
    }
};