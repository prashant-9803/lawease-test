const { default: mongoose } = require("mongoose");

const milestoneSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Complete", "Incomplete"]
    },
    date: {
        type: Date,
        default: Date.now
    },
    
})


module.exports = mongoose.model("Milestone", milestoneSchema)