'use strict';

const HTTP = require('http');

const path = require('path');

const HOSTNAME = '127.0.0.1';
const PORT = 3333;

const express = require('express'),
    es6Renderer = require('express-es6-template-engine');

const app = express();

app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, "public")));

const SERVER = HTTP.createServer(app);

SERVER.listen(PORT, HOSTNAME, () => {
    console.log(`Server running at http://${HOSTNAME}:${PORT}`)
});

const rootController = require('./routes/index'),
    imdbController = require('./routes/imdb');

app.use('/', rootController);
app.use('/imdb', imdbController);