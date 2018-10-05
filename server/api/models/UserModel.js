var mongoose = require('mongoose'),
    bcrypt = require('bcryptjs');

var UsersSchema = new mongoose.Schema({
    type: String,
    status: String,
    password: String,
    email: {
        type: String,
        lowercase: true,
        trim: true,
        index: true,
        unique: true
    }
});

UsersSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) {
      return next();
    }
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        user.password = hash;
        next();
      });
    });
  });
  
  UsersSchema.methods.comparePassword = function(password, done) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
      if (err) return done(err);
      done(null, isMatch);
    });
  };

module.exports = mongoose.model('User', UsersSchema);