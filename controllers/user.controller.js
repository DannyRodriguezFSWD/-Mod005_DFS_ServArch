const createError = require('http-errors');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

module.exports.create = (req, res, next) => {
  User.create({
    ...req.body,
    active: false
  })
    .then(user => res.status(201).json(user))
    .catch(next)
}

module.exports.list = (req, res, next) => {
    User.find()
    .then((post) => {
      res.json(post);
    })
    .catch(next);  
  }

module.exports.validate = (req, res, next) => {
    User.findByIdAndUpdate(
        req.params.id,
        { active: true },
        {
            new: true,
            runValidators: true,
        }
    )
    .then((user) => {
        if (user) {
            res.json(user);
        } else {
            next(creeateError(404, "user not found"));
        }
    })
    .catch(next)
}


module.exports.login = (req, res, next) => {
    const { email, password } = req.body;

    User.findOne({email})
    .then((user) => {
        if (user) {
            user.checkPassword(password)
                .then((match) => {
                    if (match) {
                        const token = jwt.sign(
                            {sub: user.id, exp: Date.now() / 1000 + 3600},
                            "super secret!"
                        );
                        res.json({ token })
                    } else {
                        next(createError(401, "Credenciales no son correctas"));
                    }
                })
        } else {
            next(createError(400, "Error en la validación de datos"))
        }
    })
    .catch(next)
}
module.exports.logout = (req, res, next) => {
  req.logout();
  res.status(204).end()
}