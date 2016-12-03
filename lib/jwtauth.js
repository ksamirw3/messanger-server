"use strict";
var jwt = require('jsonwebtoken');
var expiresInMinutes = '24h';
var secretKey = 'tq0$dbp0+2jq$l%mk^vnfwog85i8&_fnepxl6o-2xbwzesz!nv' //'shhhhhhared-secret';

var createToken = function(user) {
//    console.log('user: ', user);
    return jwt.sign(user, secretKey, { expiresIn: expiresInMinutes });
}

function ensureAuthorized(req, res, next) {
    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.send(403);
    }
}

var verifyToken = function verifyToken() {

    return function(req, res, next) {
        
        var token = ''

        var bearerHeader = req.headers["authorization"];
        if (typeof bearerHeader !== 'undefined') {
            var bearer = bearerHeader.split(" ");
            token = bearer[1];
            req.token = token;
        }
//        console.log('token: ', require('util').inspect(token))

        jwt.verify(token, secretKey, function(err, user) {
            if (err) {
                res.status(401).send('invalid token, or no token supplied');
            } else {
//                console.log('user: ', user);
                req.user = user;
                next();
            }
        });
    }


}

exports.createToken = createToken
exports.verifyToken = verifyToken
