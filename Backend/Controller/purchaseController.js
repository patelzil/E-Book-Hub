const boughtBooks = require("../models/boughtBookModel.js");
const Users = require("../models/userModel.js");
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'})

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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
                    status: "success",
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
        let userExist = await Users.exists({ username: req.query.username });

        if (userExist) {
            let books = await boughtBooks.find({ username: req.query.username });

            res.status(200).json({
                status: 'success',
                found: books,
            });
        } else {
            res.status(404).json({
                status: "failed",
                message: "No such user: " + req.query.username,
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

exports.postSecret = async(req, res) => {

    const domainURL = 'http://localhost:3000/';
    let session;

       const { line_items, customer_email } = req.body;

       if (!line_items || !customer_email)
       {
            throw err;
       } 
       
       try {
        session = await stripe.checkout.sessions.create({
         payment_method_types: ['card'],
         mode: 'payment',
         line_items,
         customer_email,
         success_url: `${domainURL}successfulPayment?session_id={CHECKOUT_SESSION_ID}`,
         cancel_url: `${domainURL}`,
         shipping_address_collection: { allowed_countries: ['CA', 'US'] }
       });

       res.status(200).json
       ({ 
           status: "success",
           sessionId: session.id, 
       });
    } catch (err) {
        res.status(404).json({
            status: "failed",
            description: "failed to pay for the books",
        });
    }
};
