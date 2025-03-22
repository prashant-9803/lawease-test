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

// // Get all milestones for a case
// exports.getMilestonesByCaseId = async(req, res) => {
//     try {
//         const { caseId } = req.params;
        
//         const milestones = await Milestone.find({ caseId }).sort({ createdAt: 1 });
        
//         res.status(200).json({
//             success: true,
//             count: milestones.length,
//             milestones
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Failed to fetch milestones",
//             error: error.message
//         });
//     }
// };

// // Update milestone status
// exports.updateMilestoneStatus = async(req, res) => {
//     try {
//         const { id } = req.params;
//         const { status } = req.body;
        
//         const milestone = await Milestone.findByIdAndUpdate(
//             id, 
//             { status },
//             { new: true, runValidators: true }
//         );
        
//         if (!milestone) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Milestone not found"
//             });
//         }
        
//         res.status(200).json({
//             success: true,
//             message: "Milestone status updated successfully",
//             milestone
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Failed to update milestone status",
//             error: error.message
//         });
//     }
// };

// // Delete a milestone
// exports.deleteMilestone = async(req, res) => {
//     try {
//         const { id } = req.params;
        
//         const milestone = await Milestone.findByIdAndDelete(id);
        
//         if (!milestone) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Milestone not found"
//             });
//         }
        
//         res.status(200).json({
//             success: true,
//             message: "Milestone deleted successfully"
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Failed to delete milestone",
//             error: error.message
//         });
//     }
// };