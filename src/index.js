/* eslint-disable no-console */

import express, { Router } from 'express';
import constants from './config/constants';
import './config/database';
import middlewareConfig from './config/middleware';
import apiRoutes from './modules';

const app = express();
middlewareConfig(app);

apiRoutes(app);

app.listen(constants.PORT, err => {
  if (err) {
    throw err;
  } else {
    console.log(`
        Server running on port: ${constants.PORT}
        -------
        Running on ${process.env.NODE_ENV}
        ------
        Make something great
        `);
  }
});
