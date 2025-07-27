const mongoose = require("mongoose");
const Review = require("./reviews.js")

const listingSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    description : String,
    image : {
        url : String,
        filename : String,
    },
    price : Number,
    location : String,
    country : String,
    geometry: {
    type: {
      type: String, // "Point"
      enum: ["Point"],
      required: true
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  },
  category :{
    type: String,
    enum : ["mountains","cities","amazing pools","farms","trending","rooms","castles","campign","arctic","Unavailable"],
    required : true
  },
    reviews : [
        {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Review"
    }
    ],
    owner: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
});

// This mongoose middleware execute after deleting a listing
listingSchema.post("findOneAndDelete", async(listing) => {
    if(listing){
       await Review.deleteMany({_id : {$in : listing.reviews}})
    }
})

const Listing = mongoose.model("Listing",listingSchema);

module.exports = Listing;