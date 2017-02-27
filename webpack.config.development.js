var config = require('./webpack.config.base.js');

config.devtool = 'cheap-module-source-map';
config.output.pathinfo = true;

module.exports = config;
