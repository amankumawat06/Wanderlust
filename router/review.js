const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
let { reviewListing, isLoggedIn, isReviewAuthor } = require("../middleware.js");
const reviewRController = require("../controllers/review.js")

// Review Post Route
router.post("/", isLoggedIn, reviewListing, wrapAsync(reviewRController.reviewPost));

// Review Destroy Route

router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewRController.destroyReview));

module.exports = router;
