const mongoose = require("mongoose")

const profileSchema = new mongoose.Schema({
    gender:{
        type:String,
    },
    about:{
        type:String,
        trim:true
    },
    contactNumber: {
        type:String,
        trim:true
    },
    experience: {
        type: Number,
    },
    enrollmentNumber: {
        type:String,
    },
    age : {
        type:Number,
        min:18,
    },
    district: {
        type:String,
        trim:true
    },
    taluka: {
        type:String,
        trim:true
    },
    state: {
        type:String,
        trim:true
    },
    university: {
        type:String,
        trim:true
    },
    category: {
        type:String,
        enum:[
            "Tax Lawyer",
            "Criminal Lawyer",
            "Family Lawyer",
            "Real Estate Lawyer",
            "Business Lawyer",
            "Labor & Employment Lawyer",
            "Intellectual Property Lawyer",
            "Human Rights Lawyer",
            "Personal Injury Lawyer",
            "Consumer Protection Lawyer",
        ],
    }
})

module.exports = mongoose.model("Profile", profileSchema)