const express = require("express")
const router = express.Router()


const {
    createCase, 
    acceptCase,
    isCaseCreated,
    rejectCase,
    getAllCases,
    getAllPendingCases
} = require("../controller/Case")
const { isClient, auth, isProvider } = require("../middleware/auth")


//case can be created by client only
router.post("/createCase", auth, isClient, createCase)

//case can be accepted by provider only
router.post("/acceptCase", auth, isProvider, acceptCase)

//case can be rejected by provider only
router.post("/rejectCase", auth, isProvider, rejectCase)

router.get("/isCaseCreated", isCaseCreated)

router.get("/getAllCases", auth, getAllCases)

router.get("/getAllPendingCases", auth, getAllPendingCases)



module.exports = router