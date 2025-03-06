const { addMessage, getMessages, addImageMessage, getInitialContactsWithMessages, getAllClients } = require("../controller/Message");

const {auth} = require("../middleware/auth");

const router = require("express").Router();

router.get("/get-clients",auth,getAllClients)

router.post("/add-message",auth, addMessage)
router.get("/get-messages/:from/:to",auth, getMessages)
router.post("/add-image-message", auth,addImageMessage)
router.get("/get-initial-contacts/:from", auth,getInitialContactsWithMessages)



module.exports = router
