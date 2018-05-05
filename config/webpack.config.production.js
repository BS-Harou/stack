const config = require('./webpack.config.base.js');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MainCSSPlugin = new ExtractTextPlugin('css/main.css');

config.bail = true;
config.profile = false;
config.mode = 'production';

config.output.filename = 'js/[name].[hash].min.js';

config.plugins = config.plugins.concat([
	new CleanWebpackPlugin(['dist'], {root: config.context}),
	MainCSSPlugin
]);

const rules = config.module.rules;
const myCssRuleIndex = rules.length - 1; // TODO something smarted
const [cssStyleLoader, cssLoaders] = rules[myCssRuleIndex].use;
rules[myCssRuleIndex].use = MainCSSPlugin.extract({
	fallback: cssStyleLoader,
	use: [cssLoaders],
});

module.exports = config;
