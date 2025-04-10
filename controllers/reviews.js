const Review=require("../models/review");
const Listing=require("../models/listing");




// Post Review Route
module.exports.createReview=async(req,res)=>{
    let listing=await Listing.findById(req.params.id);
    let newReview= new Review(req.body.review);
    newReview.author=req.user._id;
    console.log(new Review);
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success","New Review Created");
    res.redirect(`/listings/${listing._id}`);
};

// Delete review route

module.exports.destroyReview=async(req,res)=>{
    let {id,reviewId}=req.params;

    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});

   await  Review.findByIdAndDelete(reviewId);
   req.flash("success","Review Deleted");
   res.redirect(`/listings/${id}`);
}