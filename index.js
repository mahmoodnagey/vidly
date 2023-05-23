
const express = require('express');
const app = express();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/prod')(app);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Listening on ${port}...`)); // it's better to use winston info instead 

module.exports = server;
