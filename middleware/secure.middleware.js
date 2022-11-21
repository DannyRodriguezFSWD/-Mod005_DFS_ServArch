const createError = require('http-errors');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');


module.exports.auth = (req, res, next) => {
    const authorization = req.headers.authorization;

    if(!authorization) {
        return next(createError(401, "Unauthorized: missing auth header"));
    }

    const token = authorization.split("Bearer ")[1];

    const decoded = jwt.verify(token, "super secret!")


    User.findById(decoded.sub)
        .then((user) => {
            if (user) {
                req.user = user;
                next(); //auth OK
            } else {
                next(createError(401, "Unauthorized: invalid user"))
            }
        })
        .catch(next);
}