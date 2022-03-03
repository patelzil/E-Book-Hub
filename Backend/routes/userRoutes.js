const userController = require("../Controller/userController");

const express = require("express");

const router = express.Router();

//checking for paramter
//router.param("userID", userController.checkUserID);

router.route("/createUser").post(userController.createUser);

//: means parameter
router
    .route("/:username")
    .patch(userController.updateUser)
    // .delete(userController.deleteUser);

router.route("/:username/:password").get(userController.getUser);

module.exports = router;