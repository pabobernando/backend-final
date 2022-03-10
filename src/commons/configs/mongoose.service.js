const mongoose = require('mongoose');
const env = require('../helpers/env');

const options = {
  autoIndex: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let count = 0;

const connectWithRetry = () => {
  console.log('MongoDB Connection With Retry');
  mongoose
    .connect(env.Database_Server, options)
    .then(() => {
      console.log('MongoDB is Connected');
    })
    .catch((err) => {
      console.log(err.message, 'MongoDB Connection UnSuccessFull, Retry After 5 Seconds.', ++count);
      setTimeout(connectWithRetry, 50000);
    });
};

exports.connectWithRetry = connectWithRetry;
