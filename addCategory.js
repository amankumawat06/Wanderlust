import mongoose from "mongoose";
import Listing from "./models/listing.js";

main().then((res) => {
    console.log("Connected to DB!");
}).catch((err) => {
    console.log(err);
})

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust2")
}

try{
    const listings = await Listing.find({category : {$exists : false}})

    for(let listing of listings){
        listing.category = "Unavailable";
        await listing.save()
        console.log("listing updated!");
    }
}catch(err){
    console.log("Error occured",err);
}