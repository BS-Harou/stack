const webpack = require('webpack');
const config = require('./webpack.config.base.js');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

config.bail = true;
config.profile = false;
config.devtool = 'hidden-source-map';

// todo, there used to be assets plugn that would save the final filenam in a file
// so it can be loaded ... how do I want to do this?
config.output.filename = 'bundle.[hash].min.js';

config.plugins = config.plugins.concat([
	new UglifyJSPlugin({
		output: {
			comments: false
		},
		compress: {
			warnings: false,
			screw_ie8: true
		}
	}),
	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: '"production"'
		}
	})
]);

module.exports = config;
