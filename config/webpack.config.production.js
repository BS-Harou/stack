const webpack = require('webpack');
const config = require('./webpack.config.base.js');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MainCSSPlugin = new ExtractTextPlugin('main.css');

config.bail = true;
config.profile = false;
config.devtool = 'hidden-source-map';
config.mode = 'production';

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

const myCssRuleIndex = config.module.rules.length - 1; // TODO something smarted
const [cssStyleLoader, cssLoaders] = module.rules[myCssRuleIndex].use;
config.module.rules[myCssRuleIndex].use = MainCSSPlugin.extract({
	fallback: cssStyleLoader,
	use: [cssLoaders],
});

module.exports = config;
