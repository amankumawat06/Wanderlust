let Listing = require("./models/listing");
let Review = require("./models/reviews");
const { listingSchema, reviewSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");

module.exports.isLoggedIn = (req, res, next) => {
  // console.log(req.path, "....", req.originalUrl)
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash(
      "error",
      "You must be logged in to Add or Delete or Edit a listing!"
    );
    return res.redirect("/login");
  }
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing.owner.equals(res.locals.currUser._id)) {
    req.flash(
      "error",
      "You don't have permession to make changes in this listing"
    );
    return res.redirect(`/listings/${id}`);
  }
  next();
};

// Listing Schema Validate middleware
module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(404, "Something went Wrong");
  } else {
    next();
  }
};

// Review Schema Validate middleware
module.exports.reviewListing = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(404, errMsg);
  } else {
    next();
  }
};

module.exports.isReviewAuthor = async (req, res, next) => {
  let { reviewId, id } = req.params;
  let review = await Review.findById(reviewId);
  if (!review.author.equals(res.locals.currUser._id)) {
    req.flash(
      "error",
      "You don't have permession to make changes in this Review"
    );
    return res.redirect(`/listings/${id}`);
  }
  next();
};
