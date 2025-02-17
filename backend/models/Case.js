const { default: mongoose } = require("mongoose");

const caseSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["Open", "In-Progress", "Closed", "Rejected"]
    },
    serviceProvider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    caseAudio: {
        type: String
    },
    caseDocument: {
        type: String
    },
    caseMilestones : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Milestone"
        }
    ],
    payments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Payment"
        }
    ]

})

module.exports = mongoose.model("Case", caseSchema)