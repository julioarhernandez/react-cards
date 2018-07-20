var mongoose = require('mongoose');

var CardSchema = new mongoose.Schema({
  beInstalledDate: { type: Date, default: Date.now },
  bizId: Number,
  bizName: String,
  bizLogo: String,
  bizWeb: String,
  bizPhone: String,
  bizPosition: Number,
  bizLocation: {
    type: {type:String, default: "Point" }, 
    coordinates: [Number]
  },
  bizAddress: {
    country: String,
    state: String,
    street: String,
    zip: String,
    county: String
  },
  bizContact: String,
  bizUName: String,
  veName: String,
  veSlug: String,
  veLocation: {
    type: {type:String, default: "Point"}, 
    coordinates: [Number, Number]
  }, 
  cards: [{ 
    cardType: String,
    cardPosition: Number,
    cardTitle: String,
    cardExpiration: Date,
    cardCoupon: String,
    cardSubTitle: String,
    cardImgSrc: String,
    cardLink: String,
    cardContent: String,
    cardBundle: String
  }]
});

module.exports = mongoose.model('Cards', CardSchema);
