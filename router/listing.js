const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({storage})

router.route("/")
    .get(wrapAsync(listingController.index)) //Index Route
    .post(isLoggedIn, upload.single('image'), validateListing, wrapAsync(listingController.createNewListing));  // Create Route

// New Route
router.get("/new", isLoggedIn, listingController.renderNewFrom);

// search Route
router.get("/search",wrapAsync(listingController.searchRoute))

router.route("/:id")
    .get(wrapAsync(listingController.showListings)) // show Route
    .patch(isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListing)) //Update Route
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));  // Destroy Route

// Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.editListing));


module.exports = router;