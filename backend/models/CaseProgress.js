const { default: mongoose } = require("mongoose");

const caseProgressSchema = new mongoose.Schema({
    caseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Case",
    },
    completedMilestone: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Milestone"
        }
    ]
})

module.exports = mongoose.model("CaseProgress", caseProgressSchema)