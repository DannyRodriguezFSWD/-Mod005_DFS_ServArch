require('dotenv').config();

const mongoose = require('mongoose');

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
