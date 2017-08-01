var config = require('./webpack.config.base.js');

config.devtool = 'source-map'; //'cheap-module-source-map';
config.output.pathinfo = true;

module.exports = config;
