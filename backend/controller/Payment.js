const Milestone = require('../models/Milestone');
const Case = require('../models/Case');

// Import moment.js for date manipulation (make sure to install it via npm)
const moment = require('moment');

exports.monthlyPaymentData = async(req,res) => {
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