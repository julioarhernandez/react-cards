var mongoose = require('mongoose');

var VenueSchema = new mongoose.Schema({
    veName: String,
    veSlug: {
      type: String,
      lowercase: true,
      trim: true,
      index: true,
      unique: true
    },
    veLocation: {
      type: {type:String, default: "Point"}, 
      coordinates: [[[Number, Number]]]
    },
    vePointLocation: {
      type: {type:String, default: "Point"}, 
      coordinates: [Number, Number]
    },
    veAddress: {
        country: String,
        state: String,
        street: String,
        zip: String,
        county: String
      }
});

module.exports = mongoose.model('Venue', VenueSchema);
