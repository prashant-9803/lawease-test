const Milestone = require('../models/Milestone');
const Case = require('../models/Case');
const User = require('../models/User');
const moment = require('moment');

exports.monthlyIncomeData = async(req,res) => {
    try {
        // Get the caseId from the request body
        const {caseId} = req.body;

        // Fetch all milestones of the particular case and populate data
        const allMilestones = await Case.findById(caseId).populate('caseMilestones');
        
        // Create an empty array for monthly payments
        const monthlyPayments = Array(12).fill(0); // For each month from Jan to Dec

        // Iterate through each milestone to process payments
        allMilestones.caseMilestones.forEach(milestone => {
            const createdMonth = moment(milestone.createdAt).month(); // Get the month number (0-11)
            monthlyPayments[createdMonth] += milestone.payment; // Sum the payment to the respective month
        });

        // Format the monthlyPayments for the response
        const monthlyIncomeData = monthlyPayments.map((income, index) => {
            return { name: moment().month(index).format("MMM"), income: income }; 
        });

        // Return response
        res.status(200).json({
            success: true,
            data: monthlyIncomeData
        });
    }
    catch(error) {
        res.status(500).json({
            success: false,
            message: "Failed to get monthly payment details",
            error: error.message
        });
    }
}

exports.caseStatusData = async(req,res) => {
    try {
        const { userId } = req.body; // Modify this if the userId comes from elsewhere

        // Check if userId is provided
        if (!userId) {
            return res.status(400).json({ success: false, message: "userId is required" });
        }

        // Fetch the user's cases and populated status
        const user = await User.findById(userId).populate('cases');
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // console.log("User retireved: ", user.cases);

        // Count the cases by status
        const statusCounts = { "Open": 0, "In-progress": 0, "Closed": 0, "Rejected": 0 };

        user.cases.forEach(caseItem => {
            if (statusCounts.hasOwnProperty(caseItem.status)) {
                statusCounts[caseItem.status]++;
            }
            else {
                console.log("Status not found: ", caseItem.status);
            }
        });

        console.log("Status counts: ", statusCounts);

        // Format the data for response
        const caseStatusData = [
            { name: "Pending", value: statusCounts["Open"] }, // Open -> Pending
            { name: "In Progress", value: statusCounts["In-progress"] }, // In-Progress -> In Progress
            { name: "Completed", value: statusCounts["Closed"] } // Closed -> Completed
        ];

        // Send response
        res.status(200).json({
            success: true,
            data: caseStatusData
        });
    }
    catch(error) {
        res.status(500).json({
            success: false,
            message: "Failed to get case status data",
            error: error.message
        });
    }
}


exports.casesByMonthData = async (req, res) => {
    try {
        const userId = req.body.userId; // Get userId from request body
        if (!userId) {
            return res.status(400).json({ success: false, message: "userId is required" });
        }

        const user = await User.findById(userId).populate('cases'); // Fetch user and populate cases
        if (!user || !user.cases) {
            return res.status(404).json({ success: false, message: "User not found or no cases available" });
        }

        // Initializing month names and status counters
        const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        const statusCounts = months.map(month => ({ name: month, pending: 0, inProgress: 0, completed: 0 }));

        // Loop through each case and aggregate by month using moment
        user.cases.forEach(caseItem => {
            const caseDate = moment(caseItem.createdAt); // Use moment to parse the createdAt date
            const monthIndex = caseDate.month(); // Get month index (0-11)
            const monthData = statusCounts[monthIndex];

            switch (caseItem.status) {
                case "Open":
                    monthData.pending++; // "pending" refers to "Open"
                    break;
                case "In-progress":
                    monthData.inProgress++; // "inProgress" refers to "In-Progress"
                    break;
                case "Closed":
                    monthData.completed++; // "completed" refers to "Closed"
                    break;
                default:
                    break; // Handle other statuses if necessary
            }
        });

        // Send response
        res.status(200).json({
            success: true,
            data: statusCounts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to get cases by month data for the user",
            error: error.message
        });
    }
};