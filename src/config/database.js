/* eslint-disable no-console */
import mongoose from 'mongoose';
import constants from './constants';

// Remove the warning with Promises
mongoose.Promise = global.Promise;

// Connect the db with the Url provided


try {
  mongoose.connect(constants.MONGO_URL);
} catch (error) {
  mongoose.createConnection(constants.MONGO_URL);
}

mongoose.connection
  .once('open', () => console.log('Mongodb Running'))
  .on('error', e => {
    throw e;
  });
