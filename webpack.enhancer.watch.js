var webpack = require('webpack');
var DashboardPlugin = require('webpack-dashboard/plugin');

function findServer(entries) {
	for (var i in entries) {
		if (entries[i].match(/webpack-dev-server\/client/)) return i;
	}
	throw new Error("Watch can't be used without dev server");
}

module.exports = function(config) {

	var serverIndex = findServer(config.entry);
	config.entry.splice(
		findServer(config.entry),
		1,
		'react-hot-loader/patch',
		config.entry[serverIndex],
		'webpack/hot/only-dev-server'
	);

	config.watch = true;

	config.watchOptions = {
		ignored: /node_modules/
	};

	config.plugins = config.plugins.concat([
		new DashboardPlugin(),
		new webpack.HotModuleReplacementPlugin()
	]);
	return config;
};
