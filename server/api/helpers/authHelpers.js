var User = require('../models/UserModel');

exports.securedToken = (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }else{
        res.sendStatus(403);
    }
}
exports.isUserAuthenticated = function(req, callback) {

    User.findOne({ email: req.body.username}, function (err, user) {
        if(user && !err){
            user.comparePassword( req.body.password, function(err, isMatch) {
                if (err) throw err;
                callback(null, user);
            });
        }else{
            callback(null, false);
        }
    });
}
exports.getSecureKey = () => {
    return process.env.SECRET;
}


