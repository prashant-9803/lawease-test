const { default: mongoose } = require("mongoose")

const paymentSchema = new mongoose.Schema({
    caseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Case",
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    paymentStatus: {
        type: String,
        enum: ["Pending", "Paid"],
        required: true
    },
    
})

module.exports = mongoose.model("Payment", paymentSchema)