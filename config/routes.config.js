const express = require('express');
const router = express.Router();
const employees = require('../controllers/employees.controller')
const posts = require('../controllers/posts.controller')

router.get('/employees', employees.list)
router.get('/employees/oldest', employees.oldest)
router.get('/employees/:name', employees.name)
router.post('/employees', employees.create)

router.post('/posts', posts.create)
router.get('/posts', posts.list)
router.get('/posts/:id', posts.detail)
router.patch('/posts/:id', posts.update)
router.delete('/posts/:id', posts.delete)

module.exports = router;