const Listing = require("../listing");
const review = require("../models/review");

module.exports.isLoggedIn =(req,res,next)=>{
  console.log(req.user);
    if (!req.isAuthenticated()) {
       req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be signed in to create a new listing");
        return res.redirect("/login");
      }
      next();
};

module.exports.saveRedirectUrl = (req,res,next) =>{
  if(req.session.redirectUrl){
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
}

module.exports.isOwner = async(req,res,next)=>{
  let {id} = req.params;
      let listing = await Listing.findById(id);
      if(!listing.owner.equals(res.locals.currentUser._id)){
        req.flash("error","You are not the owner of Listing");
        return res.redirect(`/listings/${id}`);
      }
      next();
}

module.exports.isReviewAuthor = async(req,res,next)=>{
  let { id,reviewId} = req.params;
      let listing = await review.findById(reviewId);
      if(!review.owner.equals(res.locals.currentUser._id)){
        req.flash("error","You are not the author of this Review");
        return res.redirect(`/listings/${id}`);
      }
      next();
}