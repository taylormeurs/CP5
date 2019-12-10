var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Gifting = mongoose.model('Gifting');

router.param('present', function(req, res, next, id) {
  var query = Gifting.findById(id);
  query.exec(function (err, present){
    if (err) { return next(err); }
    if (!present) { return next(new Error("can't find present")); }
    req.present= present;
    return next();
  });
});

router.get('/gifting/:present',function(req,res) {
  res.json(req.present);
});

router.put('/gifting/:present/selectGift', function(req, res, next) {
  console.log("Put Route"+req.present.Name);
  req.present.selectGift(function(err, present){
    if (err) { return next(err); }
    res.json(present);
  });
});

router.put('/gifting/:present/deselectGift', function(req, res, next) {
  console.log("Put Route"+req.present.Name);
  req.present.deselectGift(function(err, present){
    if (err) { return next(err); }
    res.json(present);
  });
});

router.delete('/gifting/:present',function(req,res) {
  req.present.remove();
  res.sendStatus(200);
});

router.get('/gifting', function(req, res, next) {
  console.log("Get Route");
  Gifting.find(function(err, presents){
    if(err){ console.log("Error"); return next(err); }
    res.json(presents);
  console.log("res.json Get Route");
  });
  console.log("returningGet Route");
});

router.post('/gifting', function(req, res, next) {
  console.log("Post Route");
  var present = new Gifting(req.body);
  console.log("Post Route");
  console.log(present);
  present.save(function(err, present){
		console.log("Error "+err);
		if(err){  return next(err); }
    console.log("Post Route before json");
		res.json(present);
	});
});

module.exports = router;
