// server/index.js
// 'use strict';
import express from 'express';
import api from './api';
const app = express();
const PORT = process.env.PORT || 9000;

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

api(app);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
