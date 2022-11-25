const express = require('express');
const router = express.Router();
const employees = require('../controllers/employees.controller')
const posts = require('../controllers/posts.controller')
const users = require('../controllers/user.controller')
const secure = require('../middleware/secure.middleware')

router.get('/employees', employees.list)
router.get('/employees/oldest', employees.oldest)
router.get('/employees/:name', employees.name)
router.post('/employees', employees.create)

// post CRUD
router.post('/posts', secure.auth, posts.create)
router.get('/posts', secure.auth, posts.list)
router.get('/posts/:id', secure.auth, posts.detail)
router.patch('/posts/:id', secure.auth, posts.update)
router.delete('/posts/:id', secure.auth, posts.delete)

router.post('/users', users.create)
router.get('/users/:id/validate', users.validate)
router.get('/users', users.list)
//router.get('/users/:id', users.get)
// router.patch('/users/:id', users.update)
//router.delete('/users/:id', users.delete)

router.post('/login', users.login)


module.exports = router;