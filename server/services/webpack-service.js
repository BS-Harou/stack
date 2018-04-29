const webpack = require('webpack');
const path = require('path');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const argv = require('yargs').argv;

module.exports = (app) => {
	let webpackConfig = require(path.join(__base, 'config/webpack.config.js'));

	if (argv.watch) {
		const watchEnhancer = require(path.join(__base, 'config/webpack.enhancer.watch.js'));
		webpackConfig = watchEnhancer(webpackConfig);
	}
	const compiler = webpack(webpackConfig);
	const middleware = webpackDevMiddleware(compiler, {
		https: true,
		hot: true,
		port: 8080,
		stats: {
			all: false,
			colors: true,
			modules: false,
			maxModules: 0,
			errors: true,
			warnings: true
		},
		index: 'index.html',
		publicPath: webpackConfig.output.publicPath,
		watchContentBase: true,
	});

	app.use(middleware);
	app.use(webpackHotMiddleware(compiler));
	app.get('*', (req, res, next) => {
		const filename = path.join(compiler.outputPath, 'index.html');
		middleware.waitUntilValid(() => {
			compiler.outputFileSystem.readFile(filename, function(err, result) {
				if (err) return next(err);
				res.set('content-type', 'text/html');
				res.send(result);
				res.end();
			});
		});
	});
};
