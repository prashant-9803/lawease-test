const mongoose = require("mongoose");

const userSchema = new mongoose.Schema ({
    firstName: {
        type:String,
        required: true,
        trim:true
    },
    lastName: {
        type:String,
        required: true,
        trim:true
    },
    email:{
        type:String,
        required: true,
        trim:true
    },
    password:{
        type:String,
        required: true,
    },
    accountType: {
        type:String,
        enum:["Client","Provider"],
        required: true
    },
    image: {
        type:String,
    },
    verified: {
        type:Boolean,
        default: false
    },
    token:{
        type:String,
    },
    resetPasswordExpires:{
        type:Date
    },
    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "Profile"
    },
    pendingCaseRequest: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Case"
        }
    ],
    cases: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Case"
    }]
    ,
    payments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Payment"
        }
    ],
    caseProgress : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CaseProgress"
        }
    ],
    ratingAndReviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RatingAndReview"
        }
    ]
})

module.exports = mongoose.model("User", userSchema)