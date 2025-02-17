const express = require("express");
const router = express.Router();

const { auth, isProvider } = require("../middleware/auth");
const { setProfile, getMatchedProviders } = require("../controller/Profile");


//set profile (provider only)
router.post("/setprofile", auth, isProvider, setProfile)

router.get("/getMatchedProviders", getMatchedProviders)


module.exports = router