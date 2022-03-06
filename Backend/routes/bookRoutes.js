const bookController = require("../Controller/bookController");

const express = require("express");

const router = express.Router();

//checking for paramter
//router.param("userID", userController.checkUserID);

//: means parameter
router.route("/default").get(bookController.getBook);
router.route("/searchTitle/:bookTitle").get(bookController.getBook);
router.route("/searchAuthor/:bookAuthor").get(bookController.getBook);
router.route("/searchCategory/:bookCategory").get(bookController.getBook);
router.route("/searchPublisher/:bookPublisher").get(bookController.getBook);
router.route("/searchFree/:bookTitleFree").get(bookController.getBook);

module.exports = router;