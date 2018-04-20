// TODO: webpack merge plugin ??

var webpack = require('webpack');

module.exports = function(config) {

	config.entry.main = [
		'webpack-hot-middleware/client',
		...config.entry.main
	];

	config.watch = true;

	config.watchOptions = {
		ignored: /node_modules/
	};

	config.plugins = [
		...config.plugins,
		new webpack.HotModuleReplacementPlugin()
	];

	return config;
};
