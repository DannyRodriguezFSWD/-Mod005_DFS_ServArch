const createError = require('http-errors');
//const Like = require('../models/like.model');
//const Comment = require('../models/comment.model');
const Post = require('../models/post.model');

module.exports.list = (req, res, next) => {
  Post.find()
  .then((post) => {
    res.json(post);
  })
  .catch(next);
  
}

module.exports.create = (req, res, next) => {
  Post.create(req.body)
  .then(post => {
    res.status(201).json(post);
  }) 
  .catch((err) => {
    next(createError(400, 'hay errores en la validación del body de la petición contra el esquema definido'))
  })
}
module.exports.detail = (req, res, next) => {
  Post.findById(req.params.id)
    .then((post) => {
      if(post){
        res.json(post)
      } else {
        next(createError(404, "El post no existe en la Base de Datos en memoria"))
      }
    })
}
module.exports.update = (req, res, next) => {
  Post.findByIdAndUpdate(req.params.id, req.body, { 
    new: true,
    runValidators: true,  
  })
    .then((post) => {
      if(post){
        res.json(post)
      } else {
        next(createError(404, "El post no existe en la Base de Datos en memoria"))
      }
    })
}
module.exports.delete = (req, res, next) => {
  Post.findByIdAndDelete(req.params.id)
    .then((post) => {
      if(post){
        res.status(204).send()
      } else {
        next(createError(404, "El post no existe en la Base de Datos en memoria"))
      }
    })
}