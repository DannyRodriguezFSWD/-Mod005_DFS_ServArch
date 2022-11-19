require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const request = require('supertest');
const logger = require('morgan');

const app = express();

/** Middlewares */
app.use(logger('dev'));
app.use(express.json());


/** Routes */
const routes = require('./config/routes.config');
app.use('/api', routes);


const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.info(`Application running at port ${port}`)
});

request(app)
  .get('/api/employees')
  .expect('Content-Type', /json/)
  //.expect('Content-Length', '154')
  .expect(200)
  .end(function(err, res) {
    if (err) throw err;
  });