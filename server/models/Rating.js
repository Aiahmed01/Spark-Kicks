const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  ratingValue: {
    type: Number,
    required: true,
    min: 1,  // Assuming a 1-5 star rating scale
    max: 5
  },
  dateAndTime: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',  // Replace 'User' with the actual user model name if you have one
    required: true
  },
  reviewText: {
    type: String,
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',  // Replace 'Product' with the actual product model name
    required: true
  }
});

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;
