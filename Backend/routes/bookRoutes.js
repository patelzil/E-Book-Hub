const bookController = require("../Controller/bookController");

const express = require("express");

const router = express.Router();

//checking for paramter
//router.param("userID", userController.checkUserID);

//: means parameter
router.route("/:bookname").get(bookController.getBook);

module.exports = router;