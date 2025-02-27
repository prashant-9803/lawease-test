const { addMessage, getMessages, addImageMessage, getInitialContactsWithMessages } = require("../controller/Message");

const router = require("express").Router();

router.post("/add-message", addMessage)
router.get("/get-messages/:from/:to", getMessages)
router.post("/add-image-message", addImageMessage)
router.get("/get-initial-contacts/:from", getInitialContactsWithMessages)



module.exports = router
