const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const config = require('config');

const log = require('./helpers/log');
const routes = require('./routes');

const PORT = process.env.PORT || 3030;

const app = express();
const server = http.createServer(app);

// Hey you! care about my order http://stackoverflow.com/a/16781554/2034015

// Cookies.
app.use(cookieParser());

// Body.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Logging (debug only).
app.use(morgan('combined', { stream: { write: msg => log.info(msg) } }));

// URLs.
app.use('/', routes);

server.listen(PORT);
log.info('-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-');
log.info(`🌐  API listening on port ${PORT}`);
log.info('-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-');

module.exports = server;
