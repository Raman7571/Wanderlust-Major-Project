const express = require( "express" );
const router = express.Router();
const Listing = require("../listing.js")
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/expressError.js");
const {isLoggedIn, isOwner} = require("../init/middleware.js");
const multer  = require('multer');
const {storage}= require("../cloudConfig.js");
const upload = multer({ storage });

const listingController = require("../controllers/listings.js");

// Index Route
router.get("/",wrapAsync(listingController.index));
  
  // New Route
  
  router.get("/new",isLoggedIn,listingController.renderNewForm);
  
  // Show Route
  router.get("/:id",wrapAsync(listingController.showListing));
  
  // create Route
  router.post("/",isLoggedIn,upload.single("listing[image]"),
  wrapAsync(listingController.createListing));
 
  // /Edit Route
  
  router.get(
    "/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));
  
  // Update Route
  router.put("/:id",isLoggedIn,isOwner,upload.single("listing[image]"),wrapAsync(listingController.updateListing));
  
  // Deleate Route
  
  router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.deleteListing));

module.exports = router;
  