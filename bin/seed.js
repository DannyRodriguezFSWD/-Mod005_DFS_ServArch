require('dotenv').config();

const faker = require('faker');
const mongoose = require('mongoose');
const User = require('../models/user.model');
const Post = require('../models/post.model');

require('../config/db.config');
mongoose
    .connect(
        process.env.MONGODB_URI,
        {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        }
    )
    .then((x) => console.log('Connected to DB'))
    .catch(err => console.error('Erroe while connecting to DB', err))