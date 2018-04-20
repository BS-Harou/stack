const express = require('express');
const app = express();
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
let webpackConfig = require('../config/webpack.config.js');
const argv = require('yargs').argv;
if (argv.watch) {
	const watchEnhancer = require('../config/webpack.enhancer.watch.js');
	webpackConfig = watchEnhancer(webpackConfig);
}
const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
	hot: true,
	port: 8080,
	stats: {
		colors: true
	},
	index: 'index.html',
	publicPath: webpackConfig.output.publicPath,
	watchContentBase: true
}));

app.use(webpackHotMiddleware(compiler));

app.use(express.static('public'));
// app.use(express.static('dist'));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(8080, function () {
	console.log('Example app listening on port 8080!');
});
