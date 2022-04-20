const purchaseController = require("../Controller/purchaseController.js");

const express = require("express");

const router = express.Router();

//: means parameter
router.route("/payment").post(purchaseController.checkPaymentValidation);

router.route("/boughtBooks/getAll").get(purchaseController.getAllBooks);

router.route("/securePayment").post(purchaseController.postSecret);

module.exports = router;