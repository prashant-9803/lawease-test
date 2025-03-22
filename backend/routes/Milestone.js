const express = require('express');
const router = express.Router();
const { addMilestone } = require('../controller/Milestone');
const { isProvider, auth } = require('../middleware/auth');

// Route to add a new milestone
router.post('/add-milestone', auth, isProvider, addMilestone);


module.exports = router;
