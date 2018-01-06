var mongoose = require('mongoose');

var CardSchema = new mongoose.Schema({
  beName: String,
  beLink: String,
  beBattery: String,
  beBrand: String,
  beInstalledDate: { type: Date, default: Date.now },
  bizId: Number,
  bizName: String,
  bizLocation: [{
    type: {type:String}, 
    coordinates: [Number]
  }],
  bizAddress: [{
    country: String,
    state: String,
    zip: String,
    county: String
  }],
  bizContact: String,
  bizUName: String,
  veName: String,
  veSlug: String,
  veLocation: [{
    type: {type:String}, 
    coordinates: [Number]
  }], 
  cards: [{ 
    cardType: String,
    cardTitle: String,
    cardSubTitle: String,
    cardImgSrc: String,
    cardLink: String,
    cardContent: String
  }]
});

module.exports = mongoose.model('Cards', CardSchema);
