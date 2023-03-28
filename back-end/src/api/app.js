const express = require('express');
const cors = require('cors');
const router = require('../routes/index.routes');

const app = express();

app.use(express.json());
app.use(router);
app.use(cors());

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
