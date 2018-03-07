var mongoose = require('mongoose');

var BeaconsSchema = new mongoose.Schema({
  minor: Number,
  title: String,
  subtitle: String,
  imgSrc: String,
  link: String,
  content: String,
  title: String,

  // veName: String,
  // veSlug: String,
  // veLocation: {
  //   type: {type:String, default: "Point"}, 
  //   coordinates: [Number, Number]
  // }, 
  // cardType: String,
  // cardPosition: Number,
  // cardTitle: String,
  // cardImgSrc: String,
  // cardLink: String,
  // cardContent: String,
});

module.exports = mongoose.model('Beacon', BeaconsSchema);
