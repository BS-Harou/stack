var webpack = require('webpack');
var config = require('./webpack.config.base.js');

var SaveAssetsJson = require('assets-webpack-plugin');

config.bail = true;
config.debug = false;
config.profile = false;
config.devtool = 'hidden-source-map';

config.output.filename: 'bundle.[hash].min.js';

config.plugins = config.plugins.concat([
	new webpack.optimize.DedupePlugin(),
	new webpack.optimize.UglifyJsPlugin({
		output: {
			comments: false
		},
		compress: {
			warnings: false,
			screw_ie8: true
		}
	}),
	new SaveAssetsJson({
		path: process.cwd(),
		filename: 'assets.json'
	}),
	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: JSON.stringify('production')
		}
	})
]);
