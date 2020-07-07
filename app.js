
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyparser = require('body-parser');

const app = express();

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());
app.use(cors());

module.exports = app;