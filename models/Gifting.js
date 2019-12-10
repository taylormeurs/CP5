var mongoose = require('mongoose');

var GiftingSchema = new mongoose.Schema({
  Name: String,
  chosen: {type: Boolean, default:false},
  price: Number,
  imageURL: String
});

GiftingSchema.methods.selectGift = function(cb) {
  this.chosen = true;
  this.save(cb);
};

GiftingSchema.methods.deselectGift = function(cb) {
  this.chosen = false;
  this.save(cb);
};

mongoose.model('Gifting',GiftingSchema);
