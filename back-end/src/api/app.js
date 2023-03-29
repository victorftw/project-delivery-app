const express = require('express');
const cors = require('cors');
const router = require('../routes/index.routes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);
app.use((err, _req, res, _next) => {
  console.log(err);
  res.status(500).json(err);
});

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
