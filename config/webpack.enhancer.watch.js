var webpack = require('webpack');
var DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = function(config) {

	config.entry = [
		'react-hot-loader/patch',
		'webpack-hot-middleware/client',
		...config.entry
	];

	config.watch = true;

	config.watchOptions = {
		ignored: /node_modules/
	};

	config.plugins = [
		...config.plugins,
		new DashboardPlugin(),
		new webpack.HotModuleReplacementPlugin()
	];

	return config;
};
