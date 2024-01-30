// models/reviewModel.js
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  reviewer: {
    type: String,
    required: true,
  },
  stars: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  review: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    // You may want to add additional validation for image URLs
  },
  city: {
    type: String,
  },
  
}, {
  timestamps: true, // This option adds 'createdAt' and 'updatedAt' fields
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;
