const express = require("express")
const router = express.Router()

const {monthlyIncomeData, caseStatusData, casesByMonthData} = require("../controller/Analytics")


router.post("/monthly-income", monthlyIncomeData);
router.post("/case-status", caseStatusData);
router.post("/monthly-case-status", casesByMonthData);


module.exports = router;
