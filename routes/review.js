const express = require( "express" );
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/expressError.js");
const Review = require("../models/review.js");
const Listing = require("../listing.js");
const { isLoggedIn, validateReview, isReviewAuthor } = require("../init/middleware.js");
const review = require("../models/review.js");

const reviewController = require("../controllers/reviews.js");

// Reviews
// post Route

router.post("/",isLoggedIn, wrapAsync(reviewController.createReview));
   
   // Delete Review Route
   
   router.delete("/:reviewId",isLoggedIn,wrapAsync(reviewController.deleteReview));
   
   router.all( "*", (req,res,next)=>{
       next(new ExpressError(404, "Page Not Found"));
   });
   
   module.exports = router;