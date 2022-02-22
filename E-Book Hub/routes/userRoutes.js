const userController = require("../Controller/userController");

const express = require("express");

const router = express.Router();

//checking for paramter
router.param("userID", userController.checkUserID);

router.route("/").post(userController.createUser);

//: means parameter

router
    .route("/:userID")
    .get(userController.getUser)
    .patch(userController.updateUser);

module.exports = router;