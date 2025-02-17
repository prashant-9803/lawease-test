const Milestone = require("../models/Milestone")
const Case = require("../models/Case")
const User = require("../models/User")
const { uploadToCloudinary } = require("../utils/uploadToCloudinary")

//for client
exports.createCase = async(req,res) => {
    console.log(req.body)
    try {
        const userId = req.user.id

        let {
            description,
            status,
            serviceProvider,
            caseAudio,
        } = req.body

        const doc = req.files.caseDocument

        if(!description || !serviceProvider) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        if(!status || status == "undefined") {
            status = "Open"
        }

       //upload casedocument to cloudinary
        const caseDocument = await uploadToCloudinary(
            doc,
            process.env.FOLDER_NAME
        )
        console.log("CaseDocument: ", caseDocument)

        //create a new case
        const newCase = await Case.create({
            description,
            status,
            serviceProvider,
            caseAudio,
            caseDocument: caseDocument.secure_url,
        })

        //put a case in a user case collection
        await User.findByIdAndUpdate(userId,
            {
                $push: {
                    cases: newCase._id
                }
            },
            {new: true}
        );

        //put case in a pendingCases of a Provider
        await User.findByIdAndUpdate(
            {
                _id: serviceProvider
            },
            {
                $push: {
                    pendingCaseRequest: newCase._id
                }
            },
            {new: true}
        )


        return res.status(200).json({
            success: true,
            data: newCase,
            message: "Case created successfully"
        })

    }
    catch(error) {
        console.log(error)
        return res.status(400).json({ success: false, message: "Error while creating case" })
    }
}

//for provider
exports.acceptCase = async(req,res) => {
    try {
        //take case id
        const {caseId} = req.body

        console.log(req.body)

        //take userid
        const userId = req.user.id

        console.log("userId: ", userId)

        //if caseId missing
        if(!caseId) {
            return res.status(400).json({ 
                success: false, 
                message: "Case id is required" 
            })
        }

        //find case of that id 
        const caseData = await Case.findById(caseId)

        console.log("caseData: ", caseData)

        //make basic milestone and add to the case
        const milestone1 = await Milestone.create({
            title: "Case accepted",
            description: "Case is accepted by the service provider",
            status: "Complete",
        })

        console.log("milestone1: ", milestone1)

        const milestone2 = await Milestone.create({
            title: "Consultation",
            description: "Consultation of proposed case is done",
            status: "Incomplete",
        })

        const milestone3 = await Milestone.create({
            title: "Case Resolved",
            description: "Case is resolved by the service provider",
            status: "Incomplete",
        })
        
        //push milestones into case
        await Case.findByIdAndUpdate(caseId, {
            $push: {
                caseMilestones: { $each: [milestone1._id, milestone2._id, milestone3._id] }
            }
        })

        //update status
        await Case.findByIdAndUpdate(caseId, {
            status: "In-progress"
        })

        //remove from pendingCaseRequest of user
        await User.findByIdAndUpdate(userId, {
            $pull: {
                pendingCaseRequest: caseId
            }
        })

        //add to the cases collection of that user
        await User.findByIdAndUpdate(userId, {
            $push: {
                cases: caseData._id
            }
        })

        return res.status(200).json({ 
            success: true, 
            message: "Case accepted successfully" 
        })
    }
    catch(error) {
        return res.status(400).json({ 
            success: false, 
            message: "Error while accepting case" 
        })
    }
}

//reject case
exports.rejectCase = async(req,res) => {
    try {
        //take case id
        const {caseId} = req.body

        //take userid
        const userId = req.user.id

        //if caseId missing
        if(!caseId) {
            return res.status(400).json({ 
                success: false, 
                message: "Case id is required" 
            })
        }

        //access that case
        const caseData = await Case.findById(caseId)

        //change status of that case
        await Case.findByIdAndUpdate(caseId, {
            status: "Rejected"
        })

        //remove from pendingCaseRequest of user
        await User.findByIdAndUpdate(userId, {
            $pull: {
                pendingCaseRequest: caseId
            }
        })

        return res.status(200).json({ 
            success: true, 
            message: "Case rejected successfully" 
        })
    }
    catch(error) {
        return res.status(400).json({ 
            success: false, 
            message: "Error while rejecting case" ,
            error : error
        })
    }
}

//is case created 
exports.isCaseCreated = async(req,res) => {
    try {
        const email = req.query.email        
        const user = await User.findOne({ email: email }).populate("cases").populate("pendingCaseRequest")
        console.log("email: ", email)
        //if any case is present in pending or cases return it 
        if (user.pendingCaseRequest.length > 0) {
            return res.status(200).json({ 
                success: true, 
                data: user.pendingCaseRequest,
                message: "Pending case requests fetched successfully"
            })
        }
        else if (user.cases.length > 0) {
            return res.status(200).json({ 
                success: true, 
                data: user.cases,
                message: "Cases fetched successfully"
            })
        }
        else {
            return res.status(200).json({ 
                success: true, 
                data: [],
                message: "Cases fetched successfully"
            })
        }
    }
    catch(error) {
        return res.status(400).json({ 
            success: false, 
            message: "Error while fetching cases" 
        })
    }
}

//get all cases (for client and provider)
exports.getAllCases = async(req,res) => {
    try {
        //get user id
        const userId = req.user.id
        console.log("user: ", userId)

        //get user data
        const userData = await User.findById(userId).populate('cases');

        //get all cases of that user
        const cases = userData.cases;

        return res.status(200).json({ 
            success: true, 
            data: cases,
            message: "Cases fetched successfully" 
        })
    }
    catch(error) {
        return res.status(400).json({ 
            success: false, 
            message: "Error while fetching cases" 
        })
    }
}

//get all pending cases
exports.getAllPendingCases = async(req,res) => {
    try {
        //get user id
        const userId = req.user.id

        //get user data
        const userData = await User.findById(userId).populate('pendingCaseRequest')

        //get all cases of that user
        const pendingCases = userData.pendingCaseRequest;

        return res.status(200).json({ 
            success: true, 
            data: pendingCases,
            message: "Cases fetched successfully" 
        })
    }
    catch(error) {
        return res.status(400).json({ 
            success: false, 
            message: "Error while fetching cases" 
        })
    }
}