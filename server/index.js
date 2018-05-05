const express = require('express');
const path = require('path');
const https = require('https');
const fs = require('fs');

global.__server = __dirname;
global.__base = path.resolve(__server, '..');

const certOptions = {
	key: fs.readFileSync(path.resolve(__server, 'cert/server.key')),
	cert: fs.readFileSync(path.resolve(__server, 'cert/server.crt')),
};

const app = express();
if (process.env.NODE_ENV === 'production') {
	require('./setup-production')(app);
} else {
	require('./setup-development')(app);
}

const server = https.createServer(certOptions, app);
server.listen(8080, function () {
	console.log('Example app listening on port 8080!');
});
