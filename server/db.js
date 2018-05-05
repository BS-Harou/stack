const settings = require('./settings');
const pgp = require('pg-promise')();

module.exports = pgp(settings.postgre);
