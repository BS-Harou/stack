var express = require('express');
var app = express();
var path = require('path');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var webpackConfig = require('../webpack.config.js');
var watchEnhancer = require('../webpack.enhancer.watch.js');
webpackConfig = watchEnhancer(webpackConfig);
var compiler = webpack(webpackConfig);

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
app.use(express.static('dist'));

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(8080, function () {
	console.log('Example app listening on port 8080!');
});
