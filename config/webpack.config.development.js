var config = require('./webpack.config.base.js');

config.devtool = 'source-map'; //'cheap-module-source-map';
config.mode = 'development';

module.exports = config;
