const { default: mongoose } = require("mongoose");

const ratingAndReviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    review: {
        type: String
    },
    case : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Case",
        required: true
    }
})

module.exports = mongoose.model("RatingAndReview", ratingAndReviewSchema)