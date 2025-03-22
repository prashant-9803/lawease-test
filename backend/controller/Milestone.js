const Milestone = require('../models/Milestone');
const Case = require('../models/Case');

// Add a new milestone
exports.addMilestone = async(req, res) => {
    try {
        const { title, description, payment, caseId } = req.body;
        
        // Create the milestone
        const newMilestone = new Milestone({
            title,
            description,
            payment,
            status: "Pending"
        });
        
        await newMilestone.save();
        
        // Add milestone reference to the case
        await Case.findByIdAndUpdate(
            caseId,
            { $push: { caseMilestones: newMilestone._id } }
        );
        
        res.status(201).json({
            success: true,
            message: "Milestone added successfully",
            data: newMilestone
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to add milestone",
            error: error.message
        });
    }
};

// Complete a milestone
exports.completeMilestone = async (req, res) => {
    try {
        const { milestoneId } = req.body;
        
        // Check if milestone exists
        const milestone = await Milestone.findById(milestoneId);
        
        if (!milestone) {
            return res.status(404).json({
                success: false,
                message: "Milestone not found"
            });
        }
        
        // Update milestone status to Completed
        milestone.status = "Completed";
        await milestone.save();
        
        res.status(200).json({
            success: true,
            message: "Milestone completed successfully",
            data: milestone
        });
    } catch (error) {
        console.error("Error completing milestone:", error);
        res.status(500).json({
            success: false,
            message: "Failed to complete milestone",
            error: error.message
        });
    }
};

// Accept a milestone (by client)
exports.acceptMilestone = async (req, res) => {
    try {
        const { milestoneId } = req.body;
        
        // Check if milestone exists
        const milestone = await Milestone.findById(milestoneId);
        
        if (!milestone) {
            return res.status(404).json({
                success: false,
                message: "Milestone not found"
            });
        }
        
        // Check if milestone is in Proposed status
        if (milestone.status !== "Pending") {
            return res.status(400).json({
                success: false,
                message: "Only Pending milestones can be accepted"
            });
        }
        
        // DUMMY PAYMENT PROCESSING
        // In a real app, you would integrate with a payment gateway here
        console.log(`Processing payment of ₹${milestone.payment} for milestone: ${milestone.title}`);
        
        // Update milestone status to In-progress
        milestone.status = "In-progress";
        await milestone.save();
        
        res.status(200).json({
            success: true,
            message: "Milestone accepted and payment processed successfully",
            data: milestone
        });
    } catch (error) {
        console.error("Error accepting milestone:", error);
        res.status(500).json({
            success: false,
            message: "Failed to accept milestone",
            error: error.message
        });
    }
};

// Get all milestones for a case
exports.getAllMilestones = async (req, res) => {
    try {
        const { caseId } = req.body;
        
        // Find the case
        const caseData = await Case.findById(caseId).populate('caseMilestones');
        
        if (!caseData) {
            return res.status(404).json({
                success: false,
                message: "Case not found"
            });
        }
        
        res.status(200).json({
            success: true,
            message: "Milestones retrieved successfully",
            data: caseData.caseMilestones
        });
    } catch (error) {
        console.error("Error retrieving milestones:", error);
        res.status(500).json({
            success: false,
            message: "Failed to retrieve milestones",
            error: error.message
        });
    }
};

// Get pending milestones for a case
exports.getPendingMilestones = async (req, res) => {
    try {
        const { caseId } = req.body;
        
        // Find the case
        const caseData = await Case.findById(caseId).populate({
            path: 'caseMilestones',
            match: { status: "Pending" }
        });
        
        if (!caseData) {
            return res.status(404).json({
                success: false,
                message: "Case not found"
            });
        }
        
        res.status(200).json({
            success: true,
            message: "Pending milestones retrieved successfully",
            data: caseData.caseMilestones
        });
    } catch (error) {
        console.error("Error retrieving pending milestones:", error);
        res.status(500).json({
            success: false,
            message: "Failed to retrieve pending milestones",
            error: error.message
        });
    }
};


