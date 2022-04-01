const bookclubController = require("../Controller/bookclubController");

const express = require("express");

const router = express.Router();

router.route("/createBookclub").post(bookclubController.createBookclub);
router.route("/addUser").post(bookclubController.addUserToClub);
router.route("/message").post(bookclubController.saveMessage);
router.route("/deleteUser").post(bookclubController.removeUserfromClub);
router.route("/getAllclubs").get(bookclubController.getAllClubs);
router.route("/getBookclub/:bookclubName").get(bookclubController.getBookclub);

module.exports = router;