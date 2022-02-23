const userController = require("../Controller/userController");

const express = require("express");

const router = express.Router();

//checking for paramter
//router.param("userID", userController.checkUserID);

router.route("/").post(userController.createUser);

//: means parameter
router
    .route("/:username")
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;