const express = require('express');
const path = require('path');
const https = require('https');
const fs = require('fs');
const yaml = require('js-yaml');

const setupProduction = require('./setup-production');
const setupDevelopment = require('./setup-development');


global.__server = __dirname;
global.__base = path.resolve(__server, '..');
const settingsPath = path.join(__server, 'settings.yaml');
const settings = yaml.safeLoad(fs.readFileSync(settingsPath, 'utf8'));
const certOptions = {
	key: fs.readFileSync(path.resolve(__server, 'cert/server.key')),
	cert: fs.readFileSync(path.resolve(__server, 'cert/server.crt')),
};
const app = express();

if (process.env.NODE_ENV === 'production') {
	setupProduction(app, settings);
} else {
	setupDevelopment(app, settings);
}

const server = https.createServer(certOptions, app);
server.listen(8080, function () {
	console.log('Example app listening on port 8080!');
});
