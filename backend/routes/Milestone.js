const express = require('express');
const router = express.Router();
const { 
    addMilestone, 
    completeMilestone, 
    acceptMilestone,
    getAllMilestones,
    getPendingMilestones
} = require('../controller/Milestone');
const { auth, isProvider, isClient } = require('../middleware/auth');

// Provider adds a milestone
router.post('/add-milestone', addMilestone);

// Complete a milestone
router.post('/complete-milestone', completeMilestone);

// Client accepts a milestone
router.post('/accept-milestone', acceptMilestone);

// Get all milestones for a case
router.post('/get-all-milestones',getAllMilestones);

// Get pending milestones for a case
router.post('/get-pending-milestones',getPendingMilestones);

module.exports = router;
