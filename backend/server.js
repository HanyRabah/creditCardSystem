const server = require('./configs/app')();
const config = require('./configs/config/config');
const db = require('./configs/db');
const http = require('http');

//create the basic server setup 
server.create(config, db);

//start the server
server.start();