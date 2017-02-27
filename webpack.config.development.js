var path = require('path');
var webpack = require('webpack');
var config = require('./webpack.config.base.js');
var DashboardPlugin = require('webpack-dashboard/plugin');

if (process.env.NODE_ENV !== 'test') {
	config.entry = [
		'react-hot-loader/patch',
		'webpack-dev-server/client?http://localhost:8080',
		'webpack/hot/only-dev-server'
	].concat(config.entry);
}

config.devServer = {
	contentBase: [path.join(__dirname, "public"), path.join(__dirname, "dist")],
	hot: true,
	port: 8080,
	stats: {
		colors: true
	},
	publicPath: config.output.publicPath
};

config.devtool = '#inline-source-map';

config.output.pathinfo = true;

config.plugins = config.plugins.concat([
	new DashboardPlugin(),
	new webpack.HotModuleReplacementPlugin()
]);

module.exports = config;
