const { string, number } = require("joi");
let mongoose = require("mongoose")
let Schema = mongoose.Schema;

let reviewSchema = new Schema({
    comment : String,
    rating : {
        type : Number,
        min : 1,
        max : 5,
    },
    createdAT : {
        type : Date,
        default : Date.now(),
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
})

const Review = mongoose.model("Review",reviewSchema)

module.exports = Review;