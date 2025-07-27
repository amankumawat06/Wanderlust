const Listing = require("../models/listing");
const { listingSchema } = require("../schema.js");
let fetch = require("node-fetch");
let { getCoordinates } = require("../utils/coordinates.js");

module.exports.index = async (req, res) => {
  let AllListings = await Listing.find();
  res.render("./listings/index.ejs", { AllListings });
};

module.exports.renderNewFrom = (req, res) => {
  const listingCategorys = [
    "mountains",
    "cities",
    "amazing pools",
    "farms",
    "trending",
    "rooms",
    "castles",
    "campign",
    "arctic",
  ];
  res.render("./listings/new.ejs", { listingCategorys });
};

module.exports.createNewListing = async (req, res, next) => {
  try {
    const location = req.body.listing.location;
    const coords = await getCoordinates(location);

    if (!coords) {
      req.flash("error", "Invalid location entered");
      return res.redirect("/listings/new");
    }

    const url = req.file.path;
    const filename = req.file.filename;
    let listing = req.body.listing;
    let result = listingSchema.validate(listing);
    let newListing = new Listing(listing);
    newListing.geometry = {
      type: "Point",
      coordinates: [coords.lon, coords.lat],
    };
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    await newListing.save();
    req.flash("success", "New listing Added!");
    res.redirect("/listings");
  } catch (err) {
    console.log(err);
  }
};

module.exports.showListings = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist");
    return res.redirect("/listings");
  }
  // console.log(listing)
  res.render("./listings/show.ejs", { listing });
};

module.exports.editListing = async (req, res) => {
  let { id } = req.params;

  let listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested to Edit does not exist");
    return res.redirect("/listings");
  }
  const originalImageUrl = listing.image.url;
  originalImageUrl.replace("/upload", "/upload/w_250");

  const listingCategorys = [
    "mountains",
    "cities",
    "amazing pools",
    "farms",
    "trending",
    "rooms",
    "castles",
    "campign",
    "arctic",
  ];

  res.render("./listings/Edit.ejs", {
    listing,
    originalImageUrl,
    listingCategorys,
  });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;

  if (!req.body.listing) {
    throw new ExpressError(404, "send a valid data for listing!!");
  }

  let UpdatedListing = await Listing.findByIdAndUpdate(id, {
    ...req.body.listing,
  });

  const location = req.body.listing.location;
  const coords = await getCoordinates(location);

  if (!coords) {
    req.flash("error", "Invalid location entered");
    return res.redirect("/listings/new");
  }

  UpdatedListing.geometry = {
    type: "Point",
    coordinates: [coords.lon, coords.lat],
  };

  if (typeof req.file !== "undefined") {
    const url = req.file.path;
    const filename = req.file.filename;
    UpdatedListing.image = { url, filename };
  }
  await UpdatedListing.save();

  req.flash("success", "listing Updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "listing Deleted!");
  res.redirect("/listings");
};

module.exports.searchRoute = async (req, res) => {
  const query = req.query.q?.trim().toLowerCase();

  if (!query) {
    return res.redirect("/listings");
  }

  const listings = await Listing.find({
    $or: [
      { title: { $regex: query, $options: "i" } },
      { category: { $regex: query, $options: "i" } },
    ],
  });

  if (listings.length === 0) {
    // No listing found, show alert page or redirect with message
    return res.render("listings/searchError.ejs", { query });
  }

  res.render("listings/index", { AllListings: listings });
};
