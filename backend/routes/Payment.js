const express = require("express")
const router = express.Router()

const {monthlyPaymentData} = require("../controller/Payment")


router.post("/monthlyIncome", monthlyPaymentData);

module.exports = router;
