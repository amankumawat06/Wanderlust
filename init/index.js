let mongoose = require("mongoose");
let Listing = require("../models/listing");
let initData = require("./data.js");

main().then((res) => {
    console.log("Connected to DB!");
}).catch((err) => {
    console.log(err);
})

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust2")
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner : "687053f5312b3ffc3310c647"}))
    await Listing.insertMany(initData.data);
    console.log("data added successfully");
}

initDB()